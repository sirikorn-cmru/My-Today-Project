import type { NotificationItem } from '../types'
import { levelBadge, levelLabel } from '../lib/notificationUtils'

interface NotificationListProps {
  items: NotificationItem[]
  onSelect: (item: NotificationItem) => void
  emptyLabel?: string
}

export function NotificationList({ items, onSelect, emptyLabel }: NotificationListProps) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            onClick={() => onSelect(item)}
            className={`flex w-full items-start gap-3 rounded-xl p-3 text-left shadow-sm ring-1 ring-slate-200 ${
              item.read ? 'bg-white' : 'bg-blue-50'
            }`}
          >
            <span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${levelBadge[item.level]}`}>
              {levelLabel[item.level]}
            </span>
            <div className="min-w-0 flex-1">
              <p className={`truncate text-sm ${item.read ? 'text-slate-600' : 'font-medium text-slate-900'}`}>
                {item.message}
              </p>
            </div>
            {!item.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />}
          </button>
        </li>
      ))}
      {items.length === 0 && (
        <li className="rounded-xl bg-white p-4 text-center text-sm text-slate-500 shadow-sm ring-1 ring-slate-200">
          {emptyLabel ?? 'ไม่มีการแจ้งเตือน'}
        </li>
      )}
    </ul>
  )
}
