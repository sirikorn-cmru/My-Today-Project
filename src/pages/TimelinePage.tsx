import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { TimelineSection } from '../components/TimelineSection'
import { getTimelineEntries } from '../lib/timelineUtils'
import { linkButtonClass, pageHeaderClass } from '../lib/uiClasses'
import type { CalendarEvent, LifeArea, Task } from '../types'

interface TimelinePageProps {
  tasks: Task[]
  events: CalendarEvent[]
  lifeAreas: LifeArea[]
}

export function TimelinePage({ tasks, events, lifeAreas }: TimelinePageProps) {
  const timeline = getTimelineEntries(tasks, events, lifeAreas)

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <header className={pageHeaderClass}>
        <h1 className="text-xl font-semibold">Timeline วันนี้</h1>
        <p className="mt-1 text-sm text-blue-100">ตอนนี้ต้องทำอะไรก่อน</p>
      </header>

      <TimelineSection title="ตอนนี้ (Now)" entries={timeline.now} emptyLabel="ไม่มีรายการที่ต้องทำตอนนี้" />
      <TimelineSection title="ถัดไป (Next)" entries={timeline.next} emptyLabel="ไม่มีรายการถัดไปของวันนี้" />
      <TimelineSection title="ในวันนี้ (Later)" entries={timeline.later} emptyLabel="ไม่มีรายการเพิ่มเติมของวันนี้" />

      <div className="px-4 sm:px-6">
        <Link to="/calendar" className={linkButtonClass}>
          ดูปฏิทินแบบเต็ม →
        </Link>
      </div>

      <Footer />
    </div>
  )
}
