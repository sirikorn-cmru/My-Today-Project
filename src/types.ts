export type Priority = 'High' | 'Medium' | 'Low'
export type TaskStatus = 'To Do' | 'Doing' | 'Done'

export interface Task {
  id: string
  title: string
  description: string
  lifeAreaId: string
  dueDate: string
  dueTime: string
  priority: Priority
  status: TaskStatus
  inInbox: boolean
  createdAt: string
  // Sprint 12: อัปเดตทุกครั้งที่แก้ไข ใช้เป็นตัวตัดสิน last-write-wins ตอน sync กับ Firestore
  updatedAt: string
  // Sprint 10: เชื่อมกับ Note/Link เก็บที่ฝั่ง Task โดยตรง (ต่างจาก Task<->File ของ Sprint 4
  // ที่เก็บที่ฝั่ง File ผ่าน linkedTaskIds — เป็นการตัดสินใจออกแบบใหม่ ไม่ใช่การขยายจากเดิม)
  linkedNoteIds: string[]
  linkedLinkIds: string[]
  // นาทีก่อนกำหนดที่จะแจ้งเตือน — null = ใช้ threshold default ของ Sprint 5, ตั้งค่าแล้ว override เฉพาะ Task นี้
  reminderLeadTime: number | null
}

export type TaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>

export interface CalendarEvent {
  id: string
  title: string
  type: string
  date: string
  startTime: string
  endTime: string
  location: string
  description: string
  lifeAreaId: string
  inInbox: boolean
  createdAt: string
  updatedAt: string
  // Sprint 10 Business Rule 4: Event เชื่อมกับ Note/Link ได้ด้วยกลไกเดียวกับ Task (เก็บที่ฝั่ง Event เอง)
  linkedNoteIds: string[]
  linkedLinkIds: string[]
  reminderLeadTime: number | null
}

export type CalendarEventInput = Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>

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
  lifeAreaId: string
  linkedTaskIds: string[]
  // Sprint 10 Business Rule 4: Event เชื่อมกับ File ได้ด้วยกลไกเดียวกับ Task<->File ของ Sprint 4
  // (many-to-many ที่ File เป็นฝ่ายถือรายการ ไม่ใช่ field บน Event)
  linkedEventIds: string[]
  mimeType: string
  size: number
  inInbox: boolean
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

export interface LifeArea {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export type LifeAreaInput = Omit<LifeArea, 'id' | 'createdAt' | 'updatedAt'>

export interface Note {
  id: string
  title: string
  content: string
  lifeAreaId: string
  inInbox: boolean
  createdAt: string
  updatedAt: string
}

export type NoteInput = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>

export interface Link {
  id: string
  title: string
  url: string
  lifeAreaId: string
  inInbox: boolean
  createdAt: string
  updatedAt: string
}

export type LinkInput = Omit<Link, 'id' | 'createdAt' | 'updatedAt'>

export type InboxKind = 'task' | 'event' | 'file' | 'note' | 'link'

export interface Profile {
  name: string
  profileImage: string
  email: string
  preferredName: string
  studentId: string
  faculty: string
  major: string
  organization: string
  position: string
  updatedAt: string
}
