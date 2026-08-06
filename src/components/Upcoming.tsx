import type { UpcomingTask } from '../types'

interface UpcomingProps {
  items: UpcomingTask[]
}

export function Upcoming({ items }: UpcomingProps) {
  return (
    <section className="px-4 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-slate-900">ใกล้ครบกำหนด</h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200"
          >
            <div className="min-w-0">
              <p className="truncate font-medium text-slate-900">{item.title}</p>
              <p className="text-xs text-slate-500">{item.subject}</p>
            </div>
            <span className="shrink-0 text-xs font-medium text-amber-600">{item.dueLabel}</span>
          </li>
        ))}
        {items.length === 0 && (
          <li className="rounded-xl bg-white p-4 text-center text-sm text-slate-500 shadow-sm ring-1 ring-slate-200">
            ไม่มีงานที่ใกล้ครบกำหนด
          </li>
        )}
      </ul>
    </section>
  )
}
