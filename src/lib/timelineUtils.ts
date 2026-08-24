import type { CalendarEvent, LifeArea, Task } from '../types'
import { todayISO } from './taskUtils'
import { getLifeAreaName } from './lifeAreaUtils'

export type TimelineBucket = 'now' | 'next' | 'later'

export interface TimelineEntry {
  id: string
  kind: 'task' | 'event'
  title: string
  timeLabel: string
  subLabel: string
  bucket: TimelineBucket
  tier: number
}

function toMinutes(time: string): number | null {
  if (!time) return null
  const [h, m] = time.split(':').map(Number)
  if (Number.isNaN(h) || Number.isNaN(m)) return null
  return h * 60 + m
}

function nowMinutes(reference: Date): number {
  return reference.getHours() * 60 + reference.getMinutes()
}

interface SmartPriorityInput {
  dateStr: string
  timeStr: string
  isDone?: boolean
  isHighPriority?: boolean
  reference?: Date
}

// Sprint 9 Business Rule 2: Overdue(0) -> Due Today(1) -> Upcoming(2) -> High Priority(3) -> Normal(4).
// Tasks/Events ที่มีเวลาระบุแล้วชัดเจนตัดสินได้จากเวลาจริงเทียบกับตอนนี้ (tier 0/1/2); ส่วนรายการวันนี้ที่
// ไม่ระบุเวลา (dueTime/startTime ว่าง) ไม่มีข้อมูลพอจะบอกความเร่งด่วนจากเวลา จึงใช้ Priority ตัดสินแทน (tier 3/4)
// — กฎตายตัวล้วนๆ ไม่มี AI/machine learning ตามที่ระบุไว้ใน Business Rule ข้อ 2
export function smartPriorityTier({
  dateStr,
  timeStr,
  isDone = false,
  isHighPriority = false,
  reference = new Date(),
}: SmartPriorityInput): number {
  if (isDone) return 4
  if (!dateStr) return 4

  const today = todayISO(reference)
  if (dateStr < today) return 0 // Overdue: วันที่ผ่านไปแล้วทั้งวัน
  if (dateStr > today) return 2 // Upcoming: วันที่ในอนาคต

  const minutes = toMinutes(timeStr)
  if (minutes === null) return isHighPriority ? 3 : 4 // วันนี้แต่ไม่ระบุเวลา — ใช้ Priority ตัดสิน
  return minutes < nowMinutes(reference) ? 0 : 1 // วันนี้ + เวลาผ่านไปแล้ว = Overdue, ยังไม่ถึง = Due Today
}

export function sortTasksBySmartPriority(tasks: Task[], reference: Date = new Date()): Task[] {
  return [...tasks].sort((a, b) => {
    const tierA = smartPriorityTier({
      dateStr: a.dueDate,
      timeStr: a.dueTime,
      isDone: a.status === 'Done',
      isHighPriority: a.priority === 'High',
      reference,
    })
    const tierB = smartPriorityTier({
      dateStr: b.dueDate,
      timeStr: b.dueTime,
      isDone: b.status === 'Done',
      isHighPriority: b.priority === 'High',
      reference,
    })
    if (tierA !== tierB) return tierA - tierB
    return `${a.dueDate}T${a.dueTime}`.localeCompare(`${b.dueDate}T${b.dueTime}`)
  })
}

// Sprint 9 Business Rule 1: Timeline ครอบคลุมเฉพาะ "วันนี้" เท่านั้น แบ่งเป็น 3 กลุ่ม
// - Now: ถึงเวลาแล้ว หรือเริ่มภายใน 1 ชั่วโมงข้างหน้า (รวมรายการที่เวลาผ่านไปแล้วของวันนี้ด้วย)
// - Next: เวลาที่เหลือของวันนี้ถัดจาก Now (มีเวลาระบุชัดเจน)
// - Later: รายการของวันนี้ที่ยังไม่ระบุเวลาแน่นอน (ไม่มีทางบอกได้ว่าไกลแค่ไหนจากเวลาที่เหลือ)
export function getTimelineEntries(
  tasks: Task[],
  events: CalendarEvent[],
  lifeAreas: LifeArea[] = [],
  reference: Date = new Date(),
): Record<TimelineBucket, TimelineEntry[]> {
  const today = todayISO(reference)
  const cutoff = nowMinutes(reference) + 60

  function bucketFor(minutes: number | null): TimelineBucket {
    if (minutes === null) return 'later'
    return minutes <= cutoff ? 'now' : 'next'
  }

  const taskEntries: TimelineEntry[] = tasks
    .filter((t) => !t.inInbox && t.dueDate === today && t.status !== 'Done')
    .map((t) => ({
      id: t.id,
      kind: 'task' as const,
      title: t.title,
      timeLabel: t.dueTime || 'ไม่ระบุเวลา',
      subLabel: getLifeAreaName(lifeAreas, t.lifeAreaId) || 'กำหนดส่ง',
      bucket: bucketFor(toMinutes(t.dueTime)),
      tier: smartPriorityTier({
        dateStr: t.dueDate,
        timeStr: t.dueTime,
        isDone: false,
        isHighPriority: t.priority === 'High',
        reference,
      }),
    }))

  const eventEntries: TimelineEntry[] = events
    .filter((e) => !e.inInbox && e.date === today)
    .map((e) => ({
      id: e.id,
      kind: 'event' as const,
      title: e.title,
      timeLabel: e.endTime ? `${e.startTime}-${e.endTime}` : e.startTime || 'ไม่ระบุเวลา',
      subLabel: getLifeAreaName(lifeAreas, e.lifeAreaId) || e.location || e.type,
      bucket: bucketFor(toMinutes(e.startTime)),
      tier: smartPriorityTier({ dateStr: e.date, timeStr: e.startTime, reference }),
    }))

  const all = [...taskEntries, ...eventEntries]
  const byTierThenTime = (a: TimelineEntry, b: TimelineEntry) => a.tier - b.tier || a.timeLabel.localeCompare(b.timeLabel)

  return {
    now: all.filter((e) => e.bucket === 'now').sort(byTierThenTime),
    next: all.filter((e) => e.bucket === 'next').sort(byTierThenTime),
    later: all.filter((e) => e.bucket === 'later').sort(byTierThenTime),
  }
}

export interface LifeProgressGroup {
  lifeAreaId: string
  name: string
  completed: number
  total: number
}

export interface LifeProgressSummary {
  completed: number
  total: number
  byLifeArea: LifeProgressGroup[]
}

// Sprint 9 Business Rule 3: คำนวณจาก Task ที่ Status = Done เทียบกับ Task ทั้งหมดที่ครบกำหนดวันนี้ เท่านั้น
// (ไม่รวม Task ของวันอื่น) แสดงเป็นตัวเลขสถานะล้วนๆ ห้ามใช้คำว่า "Score" หรือลักษณะตัดสิน/เปรียบเทียบผู้ใช้
export function getLifeProgress(tasks: Task[], lifeAreas: LifeArea[], reference: Date = new Date()): LifeProgressSummary {
  const today = todayISO(reference)
  const dueToday = tasks.filter((t) => !t.inInbox && t.dueDate === today)

  const groups = new Map<string, LifeProgressGroup>()
  for (const task of dueToday) {
    const key = task.lifeAreaId || '__unassigned__'
    const name = (task.lifeAreaId && getLifeAreaName(lifeAreas, task.lifeAreaId)) || 'ไม่ระบุ Life Area'
    const group = groups.get(key) ?? { lifeAreaId: key, name, completed: 0, total: 0 }
    group.total += 1
    if (task.status === 'Done') group.completed += 1
    groups.set(key, group)
  }

  return {
    completed: dueToday.filter((t) => t.status === 'Done').length,
    total: dueToday.length,
    byLifeArea: Array.from(groups.values()).sort((a, b) => b.total - a.total),
  }
}
