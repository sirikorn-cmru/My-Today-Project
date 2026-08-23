import { Link } from 'react-router-dom'
import { iconButtonClass } from '../lib/uiClasses'

interface NotificationBellProps {
  unreadCount: number
}

export function NotificationBell({ unreadCount }: NotificationBellProps) {
  return (
    <Link
      to="/notifications"
      className={`relative ${iconButtonClass}`}
      aria-label={unreadCount > 0 ? `การแจ้งเตือน มี ${unreadCount} รายการที่ยังไม่อ่าน` : 'การแจ้งเตือน'}
    >
      <span aria-hidden>🔔</span>
      {unreadCount > 0 && (
        <span
          aria-hidden
          className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-xs font-semibold text-white"
        >
          {unreadCount}
        </span>
      )}
    </Link>
  )
}
