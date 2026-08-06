import type { Task, TaskStatus } from '../types'
import { TaskCard } from './TaskCard'

interface TodayTasksProps {
  tasks: Task[]
  onStatusChange: (id: string, status: TaskStatus) => void
}

export function TodayTasks({ tasks, onStatusChange }: TodayTasksProps) {
  return (
    <section className="px-4 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-slate-900">งานของวันนี้</h2>
      <ul className="mt-3 space-y-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            metaLabel={`กำหนดส่ง ${task.dueTime || '—'}`}
            onStatusChange={(status) => onStatusChange(task.id, status)}
          />
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
