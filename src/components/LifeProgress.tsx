import type { LifeProgressSummary } from '../lib/timelineUtils'
import { cardClass, emptyStateClass } from '../lib/uiClasses'

interface LifeProgressProps {
  progress: LifeProgressSummary
}

export function LifeProgress({ progress }: LifeProgressProps) {
  return (
    <section className="px-4 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-slate-900">ความคืบหน้าวันนี้</h2>
      {progress.total === 0 ? (
        <div className={`mt-3 ${emptyStateClass}`}>วันนี้ยังไม่มีงานที่ครบกำหนด</div>
      ) : (
        <div className={`mt-3 ${cardClass}`}>
          <p className="text-sm text-slate-600">
            วันนี้เสร็จแล้ว <span className="font-semibold text-slate-900">{progress.completed}</span> จาก{' '}
            <span className="font-semibold text-slate-900">{progress.total}</span> เรื่อง
          </p>
          {progress.byLifeArea.length > 0 && (
            <ul className="mt-3 space-y-2 border-t border-slate-100 pt-3">
              {progress.byLifeArea.map((group) => (
                <li key={group.lifeAreaId} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{group.name}</span>
                  <span className="font-medium text-slate-900">
                    {group.completed}/{group.total}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  )
}
