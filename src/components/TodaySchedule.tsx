import type { CalendarEvent } from '../types'

interface TodayScheduleProps {
  events: CalendarEvent[]
}

export function TodaySchedule({ events }: TodayScheduleProps) {
  const sorted = [...events].sort((a, b) => a.startTime.localeCompare(b.startTime))

  return (
    <section className="px-4 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-slate-900">ตารางวันนี้</h2>
      <ul className="mt-3 space-y-2">
        {sorted.map((event) => (
          <li
            key={event.id}
            className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200"
          >
            <span className="w-14 shrink-0 text-sm font-semibold text-blue-600">{event.startTime || '—'}</span>
            <div className="min-w-0">
              <p className="truncate font-medium text-slate-900">{event.title}</p>
              <p className="text-xs text-slate-500">{event.location}</p>
            </div>
          </li>
        ))}
        {sorted.length === 0 && (
          <li className="rounded-xl bg-white p-4 text-center text-sm text-slate-500 shadow-sm ring-1 ring-slate-200">
            วันนี้ไม่มีตารางเรียน/กิจกรรม
          </li>
        )}
      </ul>
    </section>
  )
}
