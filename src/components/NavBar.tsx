import { NavLink } from 'react-router-dom'

const linkBase = 'flex-1 py-3 text-center text-sm font-medium'
const linkActive = 'text-blue-600'
const linkInactive = 'text-slate-500'

export function NavBar() {
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
    </nav>
  )
}
