import type { Priority, Task, TaskStatus } from '../types'

interface TodayTasksProps {
  tasks: Task[]
}

const priorityStyle: Record<Priority, string> = {
  High: 'bg-rose-100 text-rose-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low: 'bg-slate-100 text-slate-600',
}

const statusStyle: Record<TaskStatus, string> = {
  'To Do': 'bg-slate-100 text-slate-600',
  Doing: 'bg-blue-100 text-blue-700',
  Done: 'bg-emerald-100 text-emerald-700',
}

export function TodayTasks({ tasks }: TodayTasksProps) {
  return (
    <section className="px-4 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-slate-900">งานของวันนี้</h2>
      <ul className="mt-3 space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200"
          >
            <div className="min-w-0">
              <p className="truncate font-medium text-slate-900">{task.title}</p>
              <p className="text-xs text-slate-500">
                {task.subject} · กำหนดส่ง {task.deadlineTime}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityStyle[task.priority]}`}>
                {task.priority}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyle[task.status]}`}>
                {task.status}
              </span>
            </div>
          </li>
        ))}
        {tasks.length === 0 && (
          <li className="rounded-xl bg-white p-4 text-center text-sm text-slate-500 shadow-sm ring-1 ring-slate-200">
            วันนี้ไม่มีงานที่ต้องทำ 🎉
          </li>
        )}
      </ul>
    </section>
  )
}
