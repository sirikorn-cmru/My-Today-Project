export type Priority = 'High' | 'Medium' | 'Low'
export type TaskStatus = 'To Do' | 'Doing' | 'Done'

export interface Task {
  id: string
  title: string
  description: string
  subject: string
  dueDate: string
  dueTime: string
  priority: Priority
  status: TaskStatus
  createdAt: string
}

export type TaskInput = Omit<Task, 'id' | 'createdAt'>

export interface CalendarEvent {
  id: string
  title: string
  type: string
  date: string
  startTime: string
  endTime: string
  location: string
  description: string
  createdAt: string
}

export type CalendarEventInput = Omit<CalendarEvent, 'id' | 'createdAt'>

export type CalendarViewMode = 'today' | 'week' | 'month'

export interface DayItem {
  id: string
  kind: 'event' | 'task'
  title: string
  timeLabel: string
  subLabel: string
  sortKey: string
}

export interface FileRecord {
  id: string
  name: string
  category: string
  linkedTaskIds: string[]
  mimeType: string
  size: number
  createdAt: string
  blob: Blob
}

export type FileRecordInput = Omit<FileRecord, 'id' | 'createdAt'>

export type NotificationLevel = 'Overdue' | 'DueToday' | 'DueSoon'

export interface NotificationItem {
  id: string
  kind: 'task' | 'event'
  sourceId: string
  level: NotificationLevel
  title: string
  message: string
  timeLabel: string
  read: boolean
}
