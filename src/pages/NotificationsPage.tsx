import { useNavigate } from 'react-router-dom'
import { NotificationList } from '../components/NotificationList'
import { Footer } from '../components/Footer'
import { pageHeaderClass, secondaryButtonClass } from '../lib/uiClasses'
import type { NotificationItem } from '../types'

interface NotificationsPageProps {
  notifications: NotificationItem[]
  markRead: (id: string) => void
  markAllRead: () => void
  permission: NotificationPermission | 'unsupported'
  requestPermission: () => void
}

export function NotificationsPage({
  notifications,
  markRead,
  markAllRead,
  permission,
  requestPermission,
}: NotificationsPageProps) {
  const navigate = useNavigate()

  function handleSelect(item: NotificationItem) {
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
      <header className={pageHeaderClass}>
        <h1 className="text-xl font-semibold">การแจ้งเตือน</h1>
        <p className="mt-1 text-sm text-blue-100">{notifications.length} รายการ</p>
      </header>

      <section className="flex flex-wrap gap-2 px-4 py-3 sm:px-6">
        {permission === 'default' && (
          <button type="button" onClick={requestPermission} className={secondaryButtonClass}>
            เปิดการแจ้งเตือนจาก Browser
          </button>
        )}
        {permission === 'granted' && (
          <span className="rounded-lg bg-emerald-100 px-3 py-2.5 text-sm text-emerald-700">
            เปิดการแจ้งเตือนจาก Browser แล้ว
          </span>
        )}
        {permission === 'denied' && (
          <span className="rounded-lg bg-slate-100 px-3 py-2.5 text-sm text-slate-500">
            การแจ้งเตือนจาก Browser ถูกปิดไว้ — ระบบยังใช้งานได้ตามปกติ
          </span>
        )}
        {notifications.length > 0 && (
          <button type="button" onClick={markAllRead} className={secondaryButtonClass}>
            อ่านทั้งหมดแล้ว
          </button>
        )}
      </section>

      <section className="px-4 sm:px-6">
        <NotificationList items={notifications} onSelect={handleSelect} emptyLabel="ไม่มีการแจ้งเตือนตอนนี้" />
      </section>
      <Footer />
    </div>
  )
}
