import type { CalendarEvent, DayItem, LifeArea, Task } from '../types'
import { todayISO } from './taskUtils'
import { getLifeAreaName } from './lifeAreaUtils'

export function getDayItems(date: string, events: CalendarEvent[], tasks: Task[], lifeAreas: LifeArea[] = []): DayItem[] {
  const eventItems: DayItem[] = events
    .filter((event) => !event.inInbox && event.date === date)
    .map((event) => {
      const lifeAreaName = getLifeAreaName(lifeAreas, event.lifeAreaId)
      const place = event.location || event.type
      return {
        id: event.id,
        kind: 'event',
        title: event.title,
        timeLabel: event.endTime ? `${event.startTime}-${event.endTime}` : event.startTime || '—',
        subLabel: lifeAreaName ? `${lifeAreaName} · ${place}` : place,
        sortKey: event.startTime || '99:99',
      }
    })

  const taskItems: DayItem[] = tasks
    .filter((task) => !task.inInbox && task.dueDate === date)
    .map((task) => {
      const lifeAreaName = getLifeAreaName(lifeAreas, task.lifeAreaId)
      return {
        id: task.id,
        kind: 'task',
        title: task.title,
        timeLabel: task.dueTime || '—',
        subLabel: lifeAreaName ? `กำหนดส่ง · ${lifeAreaName}` : 'กำหนดส่ง',
        sortKey: task.dueTime || '99:99',
      }
    })

  return [...eventItems, ...taskItems].sort((a, b) => a.sortKey.localeCompare(b.sortKey))
}

export function getWeekDates(reference: Date = new Date()): string[] {
  const start = new Date(reference)
  start.setDate(start.getDate() - start.getDay())
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return todayISO(d)
  })
}

export function getMonthGrid(reference: Date = new Date()): string[][] {
  const firstOfMonth = new Date(reference.getFullYear(), reference.getMonth(), 1)
  const gridStart = new Date(firstOfMonth)
  gridStart.setDate(gridStart.getDate() - firstOfMonth.getDay())

  const weeks: string[][] = []
  const cursor = new Date(gridStart)
  for (let w = 0; w < 6; w++) {
    const week: string[] = []
    for (let d = 0; d < 7; d++) {
      week.push(todayISO(cursor))
      cursor.setDate(cursor.getDate() + 1)
    }
    weeks.push(week)
  }
  return weeks
}

export function formatDayHeader(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`)
  return new Intl.DateTimeFormat('th-TH', { weekday: 'short', day: 'numeric', month: 'short' }).format(date)
}

export const weekdayLabels = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
