import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TaskCard } from '../components/TaskCard'
import { TaskFormModal } from '../components/TaskFormModal'
import { Footer } from '../components/Footer'
import { filterTasks, sortByDeadline, dueLabel } from '../lib/taskUtils'
import { getLifeAreaName } from '../lib/lifeAreaUtils'
import { emptyStateClass, fabButtonClass, inputClass, pageHeaderClass } from '../lib/uiClasses'
import type { TaskFilters } from '../lib/taskUtils'
import type { FileRecord, LifeArea, Task, TaskInput, TaskStatus, Priority } from '../types'

interface TasksPageProps {
  tasks: Task[]
  addTask: (input: TaskInput) => void
  updateTask: (id: string, input: TaskInput) => void
  deleteTask: (id: string) => void
  setStatus: (id: string, status: TaskStatus) => void
  files: FileRecord[]
  onLinkFile: (fileId: string, taskId: string) => void
  onUnlinkFile: (fileId: string, taskId: string) => void
  lifeAreas: LifeArea[]
}

const statusFilterOptions: Array<TaskStatus | 'All'> = ['All', 'To Do', 'Doing', 'Done']
const priorityFilterOptions: Array<Priority | 'All'> = ['All', 'High', 'Medium', 'Low']

export function TasksPage({
  tasks,
  addTask,
  updateTask,
  deleteTask,
  setStatus,
  files,
  onLinkFile,
  onUnlinkFile,
  lifeAreas,
}: TasksPageProps) {
  const [filters, setFilters] = useState<TaskFilters>({ status: 'All', priority: 'All', lifeAreaId: 'All', search: '' })
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [formOpen, setFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const visibleTasks = useMemo(() => {
    return sortByDeadline(filterTasks(tasks.filter((t) => !t.inInbox), filters), sortDir)
  }, [tasks, filters, sortDir])

  useEffect(() => {
    const taskId = searchParams.get('taskId')
    if (!taskId) return
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      setEditingTask(task)
      setFormOpen(true)
    }
    setSearchParams({}, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

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
      <header className={pageHeaderClass}>
        <h1 className="text-xl font-semibold">งานทั้งหมด</h1>
        <p className="mt-1 text-sm text-blue-100">{tasks.filter((t) => !t.inInbox).length} งานทั้งหมดในระบบ</p>
      </header>

      <section className="space-y-2 px-4 py-4 sm:px-6">
        <input
          value={filters.search}
          onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
          placeholder="ค้นหางาน..."
          aria-label="ค้นหางาน"
          className={inputClass}
        />

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <select
            aria-label="กรองตามสถานะ"
            value={filters.status}
            onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value as TaskFilters['status'] }))}
            className={`${inputClass} sm:flex-1`}
          >
            {statusFilterOptions.map((s) => (
              <option key={s} value={s}>
                {s === 'All' ? 'ทุกสถานะ' : s}
              </option>
            ))}
          </select>
          <select
            aria-label="กรองตาม Priority"
            value={filters.priority}
            onChange={(e) => setFilters((f) => ({ ...f, priority: e.target.value as TaskFilters['priority'] }))}
            className={`${inputClass} sm:flex-1`}
          >
            {priorityFilterOptions.map((p) => (
              <option key={p} value={p}>
                {p === 'All' ? 'ทุก Priority' : p}
              </option>
            ))}
          </select>
          <select
            aria-label="เรียงลำดับ"
            value={sortDir}
            onChange={(e) => setSortDir(e.target.value as 'asc' | 'desc')}
            className={inputClass}
          >
            <option value="asc">ใกล้ก่อน</option>
            <option value="desc">ไกลก่อน</option>
          </select>
          <select
            aria-label="กรองตาม Life Area"
            value={filters.lifeAreaId}
            onChange={(e) => setFilters((f) => ({ ...f, lifeAreaId: e.target.value }))}
            className={`${inputClass} sm:flex-1`}
          >
            <option value="All">ทุก Life Area</option>
            {lifeAreas.map((la) => (
              <option key={la.id} value={la.id}>
                {la.name}
              </option>
            ))}
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
              lifeAreaName={getLifeAreaName(lifeAreas, task.lifeAreaId)}
              showDescription
              fileCount={files.filter((f) => f.linkedTaskIds.includes(task.id)).length}
              onStatusChange={(status) => setStatus(task.id, status)}
              onEdit={() => openEdit(task)}
              onDelete={() => handleDelete(task)}
            />
          ))}
          {visibleTasks.length === 0 && <li className={emptyStateClass}>ไม่พบงานที่ตรงกับเงื่อนไข</li>}
        </ul>
      </section>
      <Footer />

      <button type="button" onClick={openCreate} className={fabButtonClass}>
        + เพิ่มงาน
      </button>

      <TaskFormModal
        open={formOpen}
        initialTask={editingTask}
        lifeAreas={lifeAreas}
        onClose={() => {
          setFormOpen(false)
          setEditingTask(null)
        }}
        onSubmit={handleSubmit}
        files={files}
        onLinkFile={(fileId) => editingTask && onLinkFile(fileId, editingTask.id)}
        onUnlinkFile={(fileId) => editingTask && onUnlinkFile(fileId, editingTask.id)}
      />
    </div>
  )
}
