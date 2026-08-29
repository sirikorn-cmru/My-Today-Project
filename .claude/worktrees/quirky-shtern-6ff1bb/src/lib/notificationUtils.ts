import type { CalendarEvent, NotificationItem, NotificationLevel, Task } from '../types'

export const levelLabel: Record<NotificationLevel, string> = {
  Overdue: 'เลยกำหนด',
  DueToday: 'ใกล้ถึงกำหนด',
  DueSoon: 'ใกล้ครบกำหนด',
}

export const levelBadge: Record<NotificationLevel, string> = {
  Overdue: 'bg-rose-100 text-rose-700',
  DueToday: 'bg-amber-100 text-amber-700',
  DueSoon: 'bg-blue-100 text-blue-700',
}

const levelOrder: Record<NotificationLevel, number> = { Overdue: 0, DueToday: 1, DueSoon: 2 }

function taskLevel(task: Task, now: number): NotificationLevel | null {
  if (task.status === 'Done') return null
  const deadline = new Date(`${task.dueDate}T${task.dueTime || '23:59'}:00`).getTime()
  const hoursUntil = (deadline - now) / (1000 * 60 * 60)
  if (hoursUntil < 0) return 'Overdue'
  if (hoursUntil <= 24) return 'DueToday'
  if (hoursUntil <= 72) return 'DueSoon'
  return null
}

function eventLevel(event: CalendarEvent, now: number): NotificationLevel | null {
  const start = new Date(`${event.date}T${event.startTime || '00:00'}:00`).getTime()
  const hoursUntil = (start - now) / (1000 * 60 * 60)
  if (hoursUntil < -2) return null
  if (hoursUntil <= 2) return 'DueToday'
  if (hoursUntil <= 24) return 'DueSoon'
  return null
}

export function buildNotifications(tasks: Task[], events: CalendarEvent[], readIds: Set<string>): NotificationItem[] {
  const now = Date.now()
  const items: NotificationItem[] = []

  for (const task of tasks) {
    const level = taskLevel(task, now)
    if (!level) continue
    const id = `task-${task.id}-${level}`
    items.push({
      id,
      kind: 'task',
      sourceId: task.id,
      level,
      title: task.title,
      message: `งาน "${task.title}" ${levelLabel[level]} (กำหนดส่ง ${task.dueDate} ${task.dueTime || ''})`.trim(),
      timeLabel: `${task.dueDate} ${task.dueTime || ''}`.trim(),
      read: readIds.has(id),
    })
  }

  for (const event of events) {
    const level = eventLevel(event, now)
    if (!level) continue
    const id = `event-${event.id}-${level}`
    items.push({
      id,
      kind: 'event',
      sourceId: event.id,
      level,
      title: event.title,
      message: `กิจกรรม "${event.title}" กำลังจะเริ่ม (${event.date} ${event.startTime || ''})`,
      timeLabel: `${event.date} ${event.startTime || ''}`.trim(),
      read: readIds.has(id),
    })
  }

  return items.sort((a, b) => levelOrder[a.level] - levelOrder[b.level] || a.timeLabel.localeCompare(b.timeLabel))
}
