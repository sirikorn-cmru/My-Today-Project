import { Link } from 'react-router-dom'

interface NotificationBellProps {
  unreadCount: number
}

export function NotificationBell({ unreadCount }: NotificationBellProps) {
  return (
    <Link to="/notifications" className="relative inline-flex items-center justify-center rounded-full bg-blue-500 p-2">
      <span aria-hidden>🔔</span>
      {unreadCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-xs font-semibold text-white">
          {unreadCount}
        </span>
      )}
    </Link>
  )
}
