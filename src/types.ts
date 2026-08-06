export type Priority = 'High' | 'Medium' | 'Low'
export type TaskStatus = 'To Do' | 'Doing' | 'Done'

export interface Task {
  id: string
  title: string
  subject: string
  deadlineTime: string
  priority: Priority
  status: TaskStatus
}

export interface UpcomingTask {
  id: string
  title: string
  subject: string
  dueLabel: string
}

export interface ScheduleItem {
  id: string
  time: string
  title: string
  location: string
}
