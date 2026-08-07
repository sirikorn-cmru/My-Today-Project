import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Header } from '../components/Header'
import { SummaryCards } from '../components/SummaryCards'
import { TodayTasks } from '../components/TodayTasks'
import { TodaySchedule } from '../components/TodaySchedule'
import { Upcoming } from '../components/Upcoming'
import { TaskFormModal } from '../components/TaskFormModal'
import { NotificationList } from '../components/NotificationList'
import { Footer } from '../components/Footer'
import { isDueToday, daysUntil, todayISO } from '../lib/taskUtils'
import type { CalendarEvent, NotificationItem, Task, TaskInput, TaskStatus } from '../types'

interface DashboardPageProps {
  tasks: Task[]
  addTask: (input: TaskInput) => void
  setStatus: (id: string, status: TaskStatus) => void
  events: CalendarEvent[]
  notifications: NotificationItem[]
  unreadCount: number
  markRead: (id: string) => void
}

const UPCOMING_WINDOW_DAYS = 3

export function DashboardPage({
  tasks,
  addTask,
  setStatus,
  events,
  notifications,
  unreadCount,
  markRead,
}: DashboardPageProps) {
  const [quickAddOpen, setQuickAddOpen] = useState(false)
  const navigate = useNavigate()

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

  const urgentNotifications = notifications.filter((n) => n.level !== 'DueSoon').slice(0, 3)

  function handleNotificationSelect(item: NotificationItem) {
    markRead(item.id)
    if (item.kind === 'task') {
      navigate(`/tasks?taskId=${item.sourceId}`)
    } else {
      const date = item.timeLabel.split(' ')[0]
      navigate(`/calendar?date=${date}`)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header today={new Date()} unreadCount={unreadCount} />
      <SummaryCards total={total} completed={completed} pending={pending} dueSoon={upcomingTasks.length} />
      {urgentNotifications.length > 0 && (
        <section className="px-4 py-4 sm:px-6">
          <h2 className="text-base font-semibold text-slate-900">การแจ้งเตือนสำคัญ</h2>
          <div className="mt-3">
            <NotificationList items={urgentNotifications} onSelect={handleNotificationSelect} />
          </div>
        </section>
      )}
      <TodayTasks tasks={todayTasks} onStatusChange={setStatus} />
      <TodaySchedule events={todayEvents} />
      <Upcoming tasks={upcomingTasks} />
      <Footer />

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
