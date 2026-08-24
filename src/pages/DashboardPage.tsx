import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Header } from '../components/Header'
import { SummaryCards } from '../components/SummaryCards'
import { TodayTasks } from '../components/TodayTasks'
import { TodaySchedule } from '../components/TodaySchedule'
import { Upcoming } from '../components/Upcoming'
import { LifeProgress } from '../components/LifeProgress'
import { TaskFormModal } from '../components/TaskFormModal'
import { NotificationList } from '../components/NotificationList'
import { Footer } from '../components/Footer'
import { isDueToday, daysUntil, todayISO } from '../lib/taskUtils'
import { getLifeProgress, sortTasksBySmartPriority } from '../lib/timelineUtils'
import { fabButtonClass } from '../lib/uiClasses'
import type { CalendarEvent, LifeArea, NotificationItem, Task, TaskInput, TaskStatus } from '../types'

interface DashboardPageProps {
  tasks: Task[]
  addTask: (input: TaskInput) => void
  setStatus: (id: string, status: TaskStatus) => void
  events: CalendarEvent[]
  notifications: NotificationItem[]
  unreadCount: number
  markRead: (id: string) => void
  lifeAreas: LifeArea[]
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
  lifeAreas,
}: DashboardPageProps) {
  const [quickAddOpen, setQuickAddOpen] = useState(false)
  const navigate = useNavigate()

  const todayTasks = sortTasksBySmartPriority(tasks.filter((t) => !t.inInbox && isDueToday(t)))
  const completed = todayTasks.filter((t) => t.status === 'Done').length
  const total = todayTasks.length
  const pending = total - completed
  const todayEvents = events.filter((e) => !e.inInbox && e.date === todayISO())
  const lifeProgress = getLifeProgress(tasks, lifeAreas)

  const upcomingTasks = tasks
    .filter((t) => {
      if (t.inInbox) return false
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
      <LifeProgress progress={lifeProgress} />
      {urgentNotifications.length > 0 && (
        <section className="px-4 py-4 sm:px-6">
          <h2 className="text-base font-semibold text-slate-900">การแจ้งเตือนสำคัญ</h2>
          <div className="mt-3">
            <NotificationList items={urgentNotifications} onSelect={handleNotificationSelect} />
          </div>
        </section>
      )}
      <TodayTasks tasks={todayTasks} lifeAreas={lifeAreas} onStatusChange={setStatus} />
      <TodaySchedule events={todayEvents} />
      <Upcoming tasks={upcomingTasks} lifeAreas={lifeAreas} />
      <Footer />

      <button type="button" onClick={() => setQuickAddOpen(true)} className={fabButtonClass}>
        + เพิ่มงาน
      </button>

      <TaskFormModal
        open={quickAddOpen}
        lifeAreas={lifeAreas}
        onClose={() => setQuickAddOpen(false)}
        onSubmit={(input) => {
          addTask(input)
          setQuickAddOpen(false)
        }}
      />
    </div>
  )
}
