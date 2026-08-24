import type { TimelineEntry } from '../lib/timelineUtils'
import { cardClass, emptyStateClass } from '../lib/uiClasses'

interface TimelineSectionProps {
  title: string
  entries: TimelineEntry[]
  emptyLabel: string
}

export function TimelineSection({ title, entries, emptyLabel }: TimelineSectionProps) {
  return (
    <section className="px-4 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      <ul className="mt-3 space-y-2">
        {entries.map((entry) => (
          <li key={`${entry.kind}-${entry.id}`} className={`flex items-center gap-3 ${cardClass} p-3`}>
            <span className="w-20 shrink-0 text-sm font-semibold text-blue-600">{entry.timeLabel}</span>
            <div className="min-w-0">
              <p className="truncate font-medium text-slate-900">{entry.title}</p>
              <p className="text-xs text-slate-500">{entry.subLabel}</p>
            </div>
            <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase text-slate-500">
              {entry.kind === 'task' ? 'งาน' : 'กิจกรรม'}
            </span>
          </li>
        ))}
        {entries.length === 0 && <li className={emptyStateClass}>{emptyLabel}</li>}
      </ul>
    </section>
  )
}
