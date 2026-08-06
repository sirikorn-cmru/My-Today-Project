import { useState } from 'react'
import { Header } from '../components/Header'
import { SummaryCards } from '../components/SummaryCards'
import { TodayTasks } from '../components/TodayTasks'
import { TodaySchedule } from '../components/TodaySchedule'
import { Upcoming } from '../components/Upcoming'
import { TaskFormModal } from '../components/TaskFormModal'
import { isDueToday, daysUntil, todayISO } from '../lib/taskUtils'
import type { CalendarEvent, Task, TaskInput, TaskStatus } from '../types'

interface DashboardPageProps {
  tasks: Task[]
  addTask: (input: TaskInput) => void
  setStatus: (id: string, status: TaskStatus) => void
  events: CalendarEvent[]
}

const UPCOMING_WINDOW_DAYS = 3

export function DashboardPage({ tasks, addTask, setStatus, events }: DashboardPageProps) {
  const [quickAddOpen, setQuickAddOpen] = useState(false)

  const todayTasks = tasks.filter((t) => isDueToday(t))
  const completed = todayTasks.filter((t) => t.status === 'Done').length
  const total = todayTasks.length
  const pending = total - completed
  const todayEvents = events.filter((e) => e.date === todayISO())

  const upcomingTasks = tasks
    .filter((t) => {
      const diff = daysUntil(t.dueDate)
      return diff > 0 && diff <= UPCOMING_WINDOW_DAYS && t.status !== 'Done'
    })
    .sort((a, b) => daysUntil(a.dueDate) - daysUntil(b.dueDate))

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header today={new Date()} />
      <SummaryCards total={total} completed={completed} pending={pending} dueSoon={upcomingTasks.length} />
      <TodayTasks tasks={todayTasks} onStatusChange={setStatus} />
      <TodaySchedule events={todayEvents} />
      <Upcoming tasks={upcomingTasks} />

      <button
        type="button"
        onClick={() => setQuickAddOpen(true)}
        className="fixed bottom-20 right-5 z-10 flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg"
      >
        + เพิ่มงาน
      </button>

      <TaskFormModal
        open={quickAddOpen}
        onClose={() => setQuickAddOpen(false)}
        onSubmit={(input) => {
          addTask(input)
          setQuickAddOpen(false)
        }}
      />
    </div>
  )
}
