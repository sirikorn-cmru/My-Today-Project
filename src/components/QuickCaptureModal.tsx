import { useState } from 'react'
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
import { ModalShell } from './ModalShell'
import { secondaryButtonClass } from '../lib/uiClasses'

interface QuickCaptureModalProps {
  open: boolean
  onClose: () => void
  lifeAreas: LifeArea[]
  tasks: Task[]
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

// Sprint 8: ปุ่มกลาง "+ Add to My Today" — เลือกประเภทก่อน แล้วกรอกแค่ข้อมูลขั้นต่ำ
// (ใช้ฟอร์มเดิมของแต่ละประเภทซ้ำ ในโหมด quickCapture ที่ผ่อนคลายฟิลด์บังคับ) รายการที่ได้
// จะเข้า My Inbox ก่อนเสมอ (inInbox: true) ผู้ใช้ค่อยไปจัดเข้า Life Area ทีหลัง
export function QuickCaptureModal({
  open,
  onClose,
  lifeAreas,
  tasks,
  addTask,
  addEvent,
  addFile,
  addNote,
  addLink,
}: QuickCaptureModalProps) {
  const [kind, setKind] = useState<InboxKind | null>(null)

  function handleClose() {
    setKind(null)
    onClose()
  }

  function handleDone() {
    setKind(null)
    onClose()
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
              onClick={() => setKind(k)}
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

  return (
    <>
      {kind === 'task' && (
        <TaskFormModal
          open
          quickCapture
          lifeAreas={lifeAreas}
          onClose={handleClose}
          onSubmit={(input) => {
            addTask(input)
            handleDone()
          }}
        />
      )}
      {kind === 'event' && (
        <EventFormModal
          open
          quickCapture
          lifeAreas={lifeAreas}
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
