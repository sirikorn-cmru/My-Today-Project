import { useState } from 'react'
import { Header } from './components/Header'
import { SummaryCards } from './components/SummaryCards'
import { TodayTasks } from './components/TodayTasks'
import { TodaySchedule } from './components/TodaySchedule'
import { Upcoming } from './components/Upcoming'
import { QuickActionModal } from './components/QuickActionModal'
import { mockSchedule, mockTasks, mockUpcoming } from './data/mockData'

function App() {
  const [quickActionOpen, setQuickActionOpen] = useState(false)
  const today = new Date()

  const total = mockTasks.length
  const completed = mockTasks.filter((task) => task.status === 'Done').length
  const pending = total - completed
  const dueSoon = mockUpcoming.length

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header today={today} />
      <SummaryCards total={total} completed={completed} pending={pending} dueSoon={dueSoon} />
      <TodayTasks tasks={mockTasks} />
      <TodaySchedule schedule={mockSchedule} />
      <Upcoming items={mockUpcoming} />

      <button
        type="button"
        onClick={() => setQuickActionOpen(true)}
        className="fixed bottom-5 right-5 z-10 flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg"
      >
        + เพิ่มงาน
      </button>

      <QuickActionModal open={quickActionOpen} onClose={() => setQuickActionOpen(false)} />
    </div>
  )
}

export default App
