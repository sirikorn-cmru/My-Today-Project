import type { LifeArea, Task } from '../types'
import { TaskCard } from './TaskCard'
import { dueLabel } from '../lib/taskUtils'
import { getLifeAreaName } from '../lib/lifeAreaUtils'
import { emptyStateClass } from '../lib/uiClasses'

interface UpcomingProps {
  tasks: Task[]
  lifeAreas: LifeArea[]
}

export function Upcoming({ tasks, lifeAreas }: UpcomingProps) {
  return (
    <section className="px-4 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-slate-900">ใกล้ครบกำหนด</h2>
      <ul className="mt-3 space-y-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            metaLabel={dueLabel(task)}
            lifeAreaName={getLifeAreaName(lifeAreas, task.lifeAreaId)}
          />
        ))}
        {tasks.length === 0 && <li className={emptyStateClass}>ไม่มีงานที่ใกล้ครบกำหนด</li>}
      </ul>
    </section>
  )
}
