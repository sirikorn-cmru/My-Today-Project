import type { CalendarEvent, DayItem, Task } from '../types'
import { todayISO } from './taskUtils'

export function getDayItems(date: string, events: CalendarEvent[], tasks: Task[]): DayItem[] {
  const eventItems: DayItem[] = events
    .filter((event) => event.date === date)
    .map((event) => ({
      id: event.id,
      kind: 'event',
      title: event.title,
      timeLabel: event.endTime ? `${event.startTime}-${event.endTime}` : event.startTime || '—',
      subLabel: event.location || event.type,
      sortKey: event.startTime || '99:99',
    }))

  const taskItems: DayItem[] = tasks
    .filter((task) => task.dueDate === date)
    .map((task) => ({
      id: task.id,
      kind: 'task',
      title: task.title,
      timeLabel: task.dueTime || '—',
      subLabel: task.subject ? `กำหนดส่ง · ${task.subject}` : 'กำหนดส่ง',
      sortKey: task.dueTime || '99:99',
    }))

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
