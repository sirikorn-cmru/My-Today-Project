import type { DayItem } from '../types'
import { formatDayHeader } from '../lib/calendarUtils'
import { cardClass, dangerLinkButtonClass, emptyStateClass, linkButtonClass } from '../lib/uiClasses'

interface DayAgendaProps {
  date: string
  items: DayItem[]
  showDateHeader?: boolean
  onViewEventDetail?: (id: string) => void
  onEditEvent?: (id: string) => void
  onDeleteEvent?: (id: string) => void
}

export function DayAgenda({ date, items, showDateHeader, onViewEventDetail, onEditEvent, onDeleteEvent }: DayAgendaProps) {
  return (
    <div>
      {showDateHeader && <h3 className="text-sm font-semibold text-slate-700">{formatDayHeader(date)}</h3>}
      <ul className={`space-y-2 ${showDateHeader ? 'mt-2' : ''}`}>
        {items.map((item) => (
          <li
            key={`${item.kind}-${item.id}`}
            className={`flex items-center gap-3 ${cardClass} p-3 transition-shadow hover:shadow-md`}
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
              (onViewEventDetail || onEditEvent || onDeleteEvent) && (
                <div className="flex shrink-0 gap-2">
                  {onViewEventDetail && (
                    <button type="button" onClick={() => onViewEventDetail(item.id)} className={linkButtonClass}>
                      รายละเอียด
                    </button>
                  )}
                  {onEditEvent && (
                    <button type="button" onClick={() => onEditEvent(item.id)} className={linkButtonClass}>
                      แก้ไข
                    </button>
                  )}
                  {onDeleteEvent && (
                    <button type="button" onClick={() => onDeleteEvent(item.id)} className={dangerLinkButtonClass}>
                      ลบ
                    </button>
                  )}
                </div>
              )
            )}
          </li>
        ))}
        {items.length === 0 && <li className={emptyStateClass}>ไม่มีรายการในวันนี้</li>}
      </ul>
    </div>
  )
}
