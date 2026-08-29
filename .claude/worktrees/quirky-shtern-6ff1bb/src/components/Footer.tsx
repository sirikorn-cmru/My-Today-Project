import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="px-4 py-6 text-center sm:px-6">
      <Link
        to="/privacy"
        className="rounded text-xs text-slate-400 underline transition-colors hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        นโยบายความเป็นส่วนตัว และข้อกำหนดการใช้งาน
      </Link>
    </footer>
  )
}
