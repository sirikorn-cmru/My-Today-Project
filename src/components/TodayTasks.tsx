import type { LifeArea, Task, TaskStatus } from '../types'
import { TaskCard } from './TaskCard'
import { getLifeAreaName } from '../lib/lifeAreaUtils'
import { emptyStateClass } from '../lib/uiClasses'

interface TodayTasksProps {
  tasks: Task[]
  lifeAreas: LifeArea[]
  onStatusChange: (id: string, status: TaskStatus) => void
}

export function TodayTasks({ tasks, lifeAreas, onStatusChange }: TodayTasksProps) {
  return (
    <section className="px-4 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-slate-900">งานของวันนี้</h2>
      <ul className="mt-3 space-y-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            metaLabel={`กำหนดส่ง ${task.dueTime || '—'}`}
            lifeAreaName={getLifeAreaName(lifeAreas, task.lifeAreaId)}
            onStatusChange={(status) => onStatusChange(task.id, status)}
          />
        ))}
        {tasks.length === 0 && <li className={emptyStateClass}>วันนี้ไม่มีงานที่ต้องทำ 🎉</li>}
      </ul>
    </section>
  )
}
