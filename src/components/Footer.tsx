import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="px-4 py-6 text-center sm:px-6">
      <Link to="/privacy" className="text-xs text-slate-400 underline">
        นโยบายความเป็นส่วนตัว และข้อกำหนดการใช้งาน
      </Link>
    </footer>
  )
}
