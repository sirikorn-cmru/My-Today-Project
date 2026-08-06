import { useMemo, useState } from 'react'
import { TaskCard } from '../components/TaskCard'
import { TaskFormModal } from '../components/TaskFormModal'
import { filterTasks, sortByDeadline, dueLabel } from '../lib/taskUtils'
import type { TaskFilters } from '../lib/taskUtils'
import type { Task, TaskInput, TaskStatus, Priority } from '../types'

interface TasksPageProps {
  tasks: Task[]
  addTask: (input: TaskInput) => void
  updateTask: (id: string, input: TaskInput) => void
  deleteTask: (id: string) => void
  setStatus: (id: string, status: TaskStatus) => void
}

const statusFilterOptions: Array<TaskStatus | 'All'> = ['All', 'To Do', 'Doing', 'Done']
const priorityFilterOptions: Array<Priority | 'All'> = ['All', 'High', 'Medium', 'Low']

export function TasksPage({ tasks, addTask, updateTask, deleteTask, setStatus }: TasksPageProps) {
  const [filters, setFilters] = useState<TaskFilters>({ status: 'All', priority: 'All', search: '' })
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [formOpen, setFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const visibleTasks = useMemo(() => {
    return sortByDeadline(filterTasks(tasks, filters), sortDir)
  }, [tasks, filters, sortDir])

  function openCreate() {
    setEditingTask(null)
    setFormOpen(true)
  }

  function openEdit(task: Task) {
    setEditingTask(task)
    setFormOpen(true)
  }

  function handleSubmit(input: TaskInput) {
    if (editingTask) {
      updateTask(editingTask.id, input)
    } else {
      addTask(input)
    }
    setFormOpen(false)
    setEditingTask(null)
  }

  function handleDelete(task: Task) {
    const confirmed = window.confirm(`ลบงาน "${task.title}" ใช่หรือไม่?`)
    if (confirmed) deleteTask(task.id)
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <header className="bg-blue-600 px-4 py-6 text-white sm:px-6">
        <h1 className="text-xl font-semibold">งานทั้งหมด</h1>
        <p className="mt-1 text-sm text-blue-100">{tasks.length} งานทั้งหมดในระบบ</p>
      </header>

      <section className="space-y-2 px-4 py-4 sm:px-6">
        <input
          value={filters.search}
          onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
          placeholder="ค้นหางาน..."
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />

        <div className="flex gap-2">
          <select
            value={filters.status}
            onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value as TaskFilters['status'] }))}
            className="flex-1 rounded-lg border border-slate-200 px-2 py-2 text-sm"
          >
            {statusFilterOptions.map((s) => (
              <option key={s} value={s}>
                {s === 'All' ? 'ทุกสถานะ' : s}
              </option>
            ))}
          </select>
          <select
            value={filters.priority}
            onChange={(e) => setFilters((f) => ({ ...f, priority: e.target.value as TaskFilters['priority'] }))}
            className="flex-1 rounded-lg border border-slate-200 px-2 py-2 text-sm"
          >
            {priorityFilterOptions.map((p) => (
              <option key={p} value={p}>
                {p === 'All' ? 'ทุก Priority' : p}
              </option>
            ))}
          </select>
          <select
            value={sortDir}
            onChange={(e) => setSortDir(e.target.value as 'asc' | 'desc')}
            className="rounded-lg border border-slate-200 px-2 py-2 text-sm"
          >
            <option value="asc">ใกล้ก่อน</option>
            <option value="desc">ไกลก่อน</option>
          </select>
        </div>
      </section>

      <section className="px-4 sm:px-6">
        <ul className="space-y-2">
          {visibleTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              metaLabel={dueLabel(task)}
              showDescription
              onStatusChange={(status) => setStatus(task.id, status)}
              onEdit={() => openEdit(task)}
              onDelete={() => handleDelete(task)}
            />
          ))}
          {visibleTasks.length === 0 && (
            <li className="rounded-xl bg-white p-4 text-center text-sm text-slate-500 shadow-sm ring-1 ring-slate-200">
              ไม่พบงานที่ตรงกับเงื่อนไข
            </li>
          )}
        </ul>
      </section>

      <button
        type="button"
        onClick={openCreate}
        className="fixed bottom-20 right-5 z-10 flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg"
      >
        + เพิ่มงาน
      </button>

      <TaskFormModal
        open={formOpen}
        initialTask={editingTask}
        onClose={() => {
          setFormOpen(false)
          setEditingTask(null)
        }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
