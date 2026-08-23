import { NavLink } from 'react-router-dom'

interface NavBarProps {
  unreadCount?: number
}

const linkBase =
  'relative flex-1 border-t-2 py-3 text-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500'
const linkActive = 'border-blue-600 text-blue-600'
const linkInactive = 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700'

export function NavBar({ unreadCount = 0 }: NavBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 flex border-t border-slate-200 bg-white">
      <NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
        วันนี้
      </NavLink>
      <NavLink to="/tasks" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
        งานทั้งหมด
      </NavLink>
      <NavLink to="/calendar" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
        ปฏิทิน
      </NavLink>
      <NavLink to="/files" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
        ไฟล์
      </NavLink>
      <NavLink
        to="/notifications"
        className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
      >
        แจ้งเตือน
        {unreadCount > 0 && (
          <span className="absolute right-3 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
            {unreadCount}
          </span>
        )}
      </NavLink>
    </nav>
  )
}
