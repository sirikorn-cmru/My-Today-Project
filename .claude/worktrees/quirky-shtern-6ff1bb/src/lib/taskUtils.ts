import type { Priority, Task, TaskStatus } from '../types'

export function todayISO(reference: Date = new Date()): string {
  const y = reference.getFullYear()
  const m = String(reference.getMonth() + 1).padStart(2, '0')
  const d = String(reference.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function daysUntil(dueDate: string, reference: Date = new Date()): number {
  const today = new Date(todayISO(reference))
  const due = new Date(dueDate)
  const diffMs = due.getTime() - today.getTime()
  return Math.round(diffMs / (1000 * 60 * 60 * 24))
}

export function isDueToday(task: Task, reference: Date = new Date()): boolean {
  return task.dueDate === todayISO(reference)
}

export function dueLabel(task: Task, reference: Date = new Date()): string {
  const diff = daysUntil(task.dueDate, reference)
  if (diff < 0) return `เลยกำหนด ${task.dueTime}`
  if (diff === 0) return `วันนี้ ${task.dueTime}`
  if (diff === 1) return `พรุ่งนี้ ${task.dueTime}`
  return `อีก ${diff} วัน`
}

export function sortByDeadline(tasks: Task[], direction: 'asc' | 'desc' = 'asc'): Task[] {
  const sorted = [...tasks].sort((a, b) => {
    const aKey = `${a.dueDate}T${a.dueTime}`
    const bKey = `${b.dueDate}T${b.dueTime}`
    return aKey.localeCompare(bKey)
  })
  return direction === 'asc' ? sorted : sorted.reverse()
}

export interface TaskFilters {
  status: TaskStatus | 'All'
  priority: Priority | 'All'
  lifeAreaId: string | 'All'
  search: string
}

export function filterTasks(tasks: Task[], filters: TaskFilters): Task[] {
  const search = filters.search.trim().toLowerCase()
  return tasks.filter((task) => {
    if (filters.status !== 'All' && task.status !== filters.status) return false
    if (filters.priority !== 'All' && task.priority !== filters.priority) return false
    if (filters.lifeAreaId !== 'All' && task.lifeAreaId !== filters.lifeAreaId) return false
    if (search) {
      const haystack = `${task.title} ${task.description}`.toLowerCase()
      if (!haystack.includes(search)) return false
    }
    return true
  })
}

export const priorityBadge: Record<Priority, string> = {
  High: 'bg-rose-100 text-rose-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low: 'bg-slate-100 text-slate-600',
}

export const statusBadge: Record<TaskStatus, string> = {
  'To Do': 'bg-slate-100 text-slate-600',
  Doing: 'bg-blue-100 text-blue-700',
  Done: 'bg-emerald-100 text-emerald-700',
}
