import type { Task, TaskStatus } from '../types'
import { priorityBadge, statusBadge } from '../lib/taskUtils'
import { cardClass, dangerLinkButtonClass, linkButtonClass } from '../lib/uiClasses'

interface TaskCardProps {
  task: Task
  metaLabel: string
  lifeAreaName?: string
  showDescription?: boolean
  fileCount?: number
  onStatusChange?: (status: TaskStatus) => void
  onEdit?: () => void
  onDelete?: () => void
  onOpenDetail?: () => void
}

const statusOptions: TaskStatus[] = ['To Do', 'Doing', 'Done']

export function TaskCard({
  task,
  metaLabel,
  lifeAreaName,
  showDescription,
  fileCount,
  onStatusChange,
  onEdit,
  onDelete,
  onOpenDetail,
}: TaskCardProps) {
  return (
    <li className={`${cardClass} p-3 transition-shadow hover:shadow-md`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-medium text-slate-900">{task.title}</p>
          <p className="text-xs text-slate-500">
            {lifeAreaName && <span>{lifeAreaName} · </span>}
            {metaLabel}
          </p>
          {showDescription && task.description && (
            <p className="mt-1 text-xs text-slate-500">{task.description}</p>
          )}
          {Boolean(fileCount) && <p className="mt-1 text-xs text-blue-600">📎 ไฟล์ที่เกี่ยวข้อง {fileCount}</p>}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityBadge[task.priority]}`}>
            {task.priority}
          </span>
          {onStatusChange ? (
            <select
              aria-label="สถานะงาน"
              value={task.status}
              onChange={(e) => onStatusChange(e.target.value as TaskStatus)}
              className={`rounded-full border-none px-2 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 ${statusBadge[task.status]}`}
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          ) : (
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge[task.status]}`}>
              {task.status}
            </span>
          )}
        </div>
      </div>

      {(onOpenDetail || onEdit || onDelete) && (
        <div className="mt-2 flex justify-end gap-3 border-t border-slate-100 pt-2">
          {onOpenDetail && (
            <button type="button" onClick={onOpenDetail} className={linkButtonClass}>
              รายละเอียด
            </button>
          )}
          {onEdit && (
            <button type="button" onClick={onEdit} className={linkButtonClass}>
              แก้ไข
            </button>
          )}
          {onDelete && (
            <button type="button" onClick={onDelete} className={dangerLinkButtonClass}>
              ลบ
            </button>
          )}
        </div>
      )}
    </li>
  )
}
