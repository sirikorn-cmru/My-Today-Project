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

export interface ScheduleItem {
  id: string
  time: string
  title: string
  location: string
}
