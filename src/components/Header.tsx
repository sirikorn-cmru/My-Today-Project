import { Link } from 'react-router-dom'
import { NotificationBell } from './NotificationBell'
import { iconButtonClass, pageHeaderClass } from '../lib/uiClasses'

interface HeaderProps {
  today: Date
  unreadCount?: number
}

export function Header({ today, unreadCount = 0 }: HeaderProps) {
  const dateLabel = new Intl.DateTimeFormat('th-TH-u-ca-buddhist', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(today)

  return (
    <header className={pageHeaderClass}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-blue-100">My Today</p>
          <p className="mt-1 text-sm text-blue-100">{dateLabel}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/life-areas" className={iconButtonClass} aria-label="Life Areas">
            <span aria-hidden>🗂️</span>
          </Link>
          <Link to="/profile" className={iconButtonClass} aria-label="Profile">
            <span aria-hidden>👤</span>
          </Link>
          <NotificationBell unreadCount={unreadCount} />
        </div>
      </div>
      <h1 className="mt-2 text-xl font-semibold sm:text-2xl">สวัสดี วันนี้มีอะไรต้องทำบ้าง</h1>
    </header>
  )
}
