import type { DayItem } from '../types'
import { formatDayHeader } from '../lib/calendarUtils'

interface DayAgendaProps {
  date: string
  items: DayItem[]
  showDateHeader?: boolean
  onEditEvent?: (id: string) => void
  onDeleteEvent?: (id: string) => void
}

export function DayAgenda({ date, items, showDateHeader, onEditEvent, onDeleteEvent }: DayAgendaProps) {
  return (
    <div>
      {showDateHeader && <h3 className="text-sm font-semibold text-slate-700">{formatDayHeader(date)}</h3>}
      <ul className={`space-y-2 ${showDateHeader ? 'mt-2' : ''}`}>
        {items.map((item) => (
          <li
            key={`${item.kind}-${item.id}`}
            className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200"
          >
            <span className="w-20 shrink-0 text-sm font-semibold text-blue-600">{item.timeLabel}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-slate-900">{item.title}</p>
              <p className="text-xs text-slate-500">{item.subLabel}</p>
            </div>
            {item.kind === 'task' ? (
              <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                Task
              </span>
            ) : (
              (onEditEvent || onDeleteEvent) && (
                <div className="flex shrink-0 gap-2">
                  {onEditEvent && (
                    <button
                      type="button"
                      onClick={() => onEditEvent(item.id)}
                      className="text-xs font-medium text-blue-600"
                    >
                      แก้ไข
                    </button>
                  )}
                  {onDeleteEvent && (
                    <button
                      type="button"
                      onClick={() => onDeleteEvent(item.id)}
                      className="text-xs font-medium text-rose-600"
                    >
                      ลบ
                    </button>
                  )}
                </div>
              )
            )}
          </li>
        ))}
        {items.length === 0 && (
          <li className="rounded-xl bg-white p-4 text-center text-sm text-slate-500 shadow-sm ring-1 ring-slate-200">
            ไม่มีรายการในวันนี้
          </li>
        )}
      </ul>
    </div>
  )
}
