import { useState } from 'react'
import type { User } from 'firebase/auth'
import type {
  CalendarEventInput,
  FileRecordInput,
  InboxKind,
  LifeArea,
  LinkInput,
  NoteInput,
  Task,
  TaskInput,
} from '../types'
import { TaskFormModal } from './TaskFormModal'
import { EventFormModal } from './EventFormModal'
import { FileFormModal } from './FileFormModal'
import { NoteFormModal } from './NoteFormModal'
import { LinkFormModal } from './LinkFormModal'
import { SmartCaptureModal } from './SmartCaptureModal'
import type { SmartCaptureExtractedFields } from './SmartCaptureModal'
import { ModalShell } from './ModalShell'
import { primaryButtonClass, secondaryButtonClass } from '../lib/uiClasses'

interface QuickCaptureModalProps {
  open: boolean
  onClose: () => void
  lifeAreas: LifeArea[]
  tasks: Task[]
  user: User | null
  addTask: (input: TaskInput) => void
  addEvent: (input: CalendarEventInput) => void
  addFile: (input: FileRecordInput) => void
  addNote: (input: NoteInput) => void
  addLink: (input: LinkInput) => void
}

const kindLabel: Record<InboxKind, string> = {
  task: 'งาน (Task)',
  event: 'กิจกรรม (Event)',
  file: 'ไฟล์ (File)',
  note: 'บันทึก (Note)',
  link: 'ลิงก์ (Link)',
}

const kindIcon: Record<InboxKind, string> = {
  task: '✅',
  event: '📅',
  file: '📎',
  note: '📝',
  link: '🔗',
}

type CaptureMode = 'choose' | 'manual' | 'scan'

// Sprint 8: ปุ่มกลาง "+ Add to My Today" — เลือกประเภทก่อน แล้วกรอกแค่ข้อมูลขั้นต่ำ
// (ใช้ฟอร์มเดิมของแต่ละประเภทซ้ำ ในโหมด quickCapture ที่ผ่อนคลายฟิลด์บังคับ) รายการที่ได้
// จะเข้า My Inbox ก่อนเสมอ (inInbox: true) ผู้ใช้ค่อยไปจัดเข้า Life Area ทีหลัง
export function QuickCaptureModal({
  open,
  onClose,
  lifeAreas,
  tasks,
  user,
  addTask,
  addEvent,
  addFile,
  addNote,
  addLink,
}: QuickCaptureModalProps) {
  const [kind, setKind] = useState<InboxKind | null>(null)
  // Sprint 13: kind "event" มีทางเลือกสอง — กรอกเองแบบเดิม vs สแกนจากรูปภาพ
  // Sprint 15: ขยายมาให้ kind "task" มีทางเลือกเดียวกันด้วย (อีก 3 ประเภท File/Note/Link ไม่มี)
  const [eventMode, setEventMode] = useState<CaptureMode>('choose')
  const [eventPrefill, setEventPrefill] = useState<Partial<CalendarEventInput>>({})
  const [taskMode, setTaskMode] = useState<CaptureMode>('choose')
  const [taskPrefill, setTaskPrefill] = useState<Partial<TaskInput>>({})

  function handleClose() {
    setKind(null)
    setEventMode('choose')
    setEventPrefill({})
    setTaskMode('choose')
    setTaskPrefill({})
    onClose()
  }

  function handleDone() {
    setKind(null)
    setEventMode('choose')
    setEventPrefill({})
    setTaskMode('choose')
    setTaskPrefill({})
    onClose()
  }

  function selectKind(k: InboxKind) {
    setKind(k)
    if (k === 'event') setEventMode('choose')
    if (k === 'task') setTaskMode('choose')
  }

  // Sprint 15 Business Rule 3: mapping ผลลัพธ์ดิบจาก AI เข้าฟิลด์ปลายทางของ Task
  // (ต่างจาก Event ตรงที่ date/startTime ของ Task ชื่อ dueDate/dueTime)
  function mapExtractedToTask(fields: SmartCaptureExtractedFields): Partial<TaskInput> {
    const prefill: Partial<TaskInput> = {}
    if (fields.title) prefill.title = fields.title
    if (fields.date) prefill.dueDate = fields.date
    if (fields.startTime) prefill.dueTime = fields.startTime
    if (fields.location) prefill.location = fields.location
    return prefill
  }

  if (!open) return null

  if (kind === null) {
    return (
      <ModalShell titleId="quick-capture-title" onClose={handleClose}>
        <h3 id="quick-capture-title" className="text-lg font-semibold text-slate-900">
          + Add to My Today
        </h3>
        <p className="mt-1 text-xs text-slate-500">เลือกประเภทสิ่งที่จะบันทึก — กรอกแค่ชื่อก็บันทึกได้ทันที</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {(Object.keys(kindLabel) as InboxKind[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => selectKind(k)}
              className="flex flex-col items-center gap-1 rounded-xl border border-slate-200 p-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span className="text-2xl" aria-hidden>
                {kindIcon[k]}
              </span>
              {kindLabel[k]}
            </button>
          ))}
        </div>

        <button type="button" onClick={handleClose} className={`mt-4 w-full ${secondaryButtonClass}`}>
          ยกเลิก
        </button>
      </ModalShell>
    )
  }

  if (kind === 'event' && eventMode === 'choose') {
    return (
      <ModalShell titleId="quick-capture-event-title" onClose={handleClose}>
        <h3 id="quick-capture-event-title" className="text-lg font-semibold text-slate-900">
          + Add to My Today — กิจกรรม
        </h3>
        <p className="mt-1 text-xs text-slate-500">เลือกวิธีเพิ่มกิจกรรม</p>

        <div className="mt-4 space-y-2">
          <button type="button" onClick={() => setEventMode('manual')} className={`w-full ${primaryButtonClass}`}>
            กรอกฟอร์มเอง
          </button>
          <button type="button" onClick={() => setEventMode('scan')} className={`w-full ${secondaryButtonClass}`}>
            📷 สแกนจากรูปภาพ
          </button>
        </div>

        <button type="button" onClick={handleClose} className={`mt-4 w-full text-center text-xs text-slate-500 underline`}>
          ยกเลิก
        </button>
      </ModalShell>
    )
  }

  if (kind === 'event' && eventMode === 'scan') {
    return (
      <SmartCaptureModal
        open
        user={user}
        kind="event"
        onClose={handleClose}
        onManualFallback={() => {
          setEventPrefill({})
          setEventMode('manual')
        }}
        onExtracted={(fields) => {
          setEventPrefill(fields)
          setEventMode('manual')
        }}
      />
    )
  }

  // Sprint 15: pattern เดียวกับ Event ด้านบนทุกประการ ต่างกันแค่ mapping ผลลัพธ์ (mapExtractedToTask)
  if (kind === 'task' && taskMode === 'choose') {
    return (
      <ModalShell titleId="quick-capture-task-title" onClose={handleClose}>
        <h3 id="quick-capture-task-title" className="text-lg font-semibold text-slate-900">
          + Add to My Today — งาน
        </h3>
        <p className="mt-1 text-xs text-slate-500">เลือกวิธีเพิ่มงาน</p>

        <div className="mt-4 space-y-2">
          <button type="button" onClick={() => setTaskMode('manual')} className={`w-full ${primaryButtonClass}`}>
            กรอกฟอร์มเอง
          </button>
          <button type="button" onClick={() => setTaskMode('scan')} className={`w-full ${secondaryButtonClass}`}>
            📷 สแกนจากรูปภาพ
          </button>
        </div>

        <button type="button" onClick={handleClose} className={`mt-4 w-full text-center text-xs text-slate-500 underline`}>
          ยกเลิก
        </button>
      </ModalShell>
    )
  }

  if (kind === 'task' && taskMode === 'scan') {
    return (
      <SmartCaptureModal
        open
        user={user}
        kind="task"
        onClose={handleClose}
        onManualFallback={() => {
          setTaskPrefill({})
          setTaskMode('manual')
        }}
        onExtracted={(fields) => {
          setTaskPrefill(mapExtractedToTask(fields))
          setTaskMode('manual')
        }}
      />
    )
  }

  return (
    <>
      {kind === 'task' && taskMode === 'manual' && (
        <TaskFormModal
          open
          quickCapture
          lifeAreas={lifeAreas}
          prefill={taskPrefill}
          onClose={handleClose}
          onSubmit={(input) => {
            addTask(input)
            handleDone()
          }}
        />
      )}
      {kind === 'event' && eventMode === 'manual' && (
        <EventFormModal
          open
          quickCapture
          lifeAreas={lifeAreas}
          prefill={eventPrefill}
          onClose={handleClose}
          onSubmit={(input) => {
            addEvent(input)
            handleDone()
          }}
        />
      )}
      {kind === 'file' && (
        <FileFormModal
          open
          quickCapture
          tasks={tasks}
          lifeAreas={lifeAreas}
          onClose={handleClose}
          onSubmit={(input) => {
            addFile(input)
            handleDone()
          }}
        />
      )}
      {kind === 'note' && (
        <NoteFormModal
          open
          quickCapture
          lifeAreas={lifeAreas}
          onClose={handleClose}
          onSubmit={(input) => {
            addNote(input)
            handleDone()
          }}
        />
      )}
      {kind === 'link' && (
        <LinkFormModal
          open
          quickCapture
          lifeAreas={lifeAreas}
          onClose={handleClose}
          onSubmit={(input) => {
            addLink(input)
            handleDone()
          }}
        />
      )}
    </>
  )
}
