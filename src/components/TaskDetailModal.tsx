import type { FileRecord, LifeArea, Link, Note, Task, TaskInput } from '../types'
import { downloadBlob, formatBytes } from '../lib/fileUtils'
import { formatLeadTime, reminderLeadTimeOptions } from '../lib/taskUtils'
import { getLifeAreaName } from '../lib/lifeAreaUtils'
import { priorityBadge, statusBadge } from '../lib/taskUtils'
import { dangerLinkButtonClass, inputClass } from '../lib/uiClasses'
import { ModalShell } from './ModalShell'

interface TaskDetailModalProps {
  open: boolean
  task: Task | null
  lifeAreas: LifeArea[]
  files: FileRecord[]
  notes: Note[]
  links: Link[]
  onClose: () => void
  onUpdateTask: (id: string, input: TaskInput) => void
  onLinkFile: (fileId: string, taskId: string) => void
  onUnlinkFile: (fileId: string, taskId: string) => void
}

function toInput(task: Task): TaskInput {
  const { id: _id, createdAt: _createdAt, ...input } = task
  return input
}

// Sprint 10: หน้ารายละเอียด Task แบบ What/When/Information ในหน้าเดียว (Business Rule 3)
// — ต่อยอดจาก Related Files ของ Sprint 4 (ผ่าน onLinkFile/onUnlinkFile เดิม) เพิ่มการเชื่อม
// Note/Link ที่เก็บตรงบน Task เอง และ custom reminder lead time (Business Rule 1-2)
export function TaskDetailModal({
  open,
  task,
  lifeAreas,
  files,
  notes,
  links,
  onClose,
  onUpdateTask,
  onLinkFile,
  onUnlinkFile,
}: TaskDetailModalProps) {
  if (!open || !task) return null

  const linkedFiles = files.filter((f) => f.linkedTaskIds.includes(task.id))
  const unlinkedFiles = files.filter((f) => !f.linkedTaskIds.includes(task.id))
  const linkedNotes = notes.filter((n) => task.linkedNoteIds.includes(n.id))
  const unlinkedNotes = notes.filter((n) => !task.linkedNoteIds.includes(n.id))
  const linkedLinks = links.filter((l) => task.linkedLinkIds.includes(l.id))
  const unlinkedLinks = links.filter((l) => !task.linkedLinkIds.includes(l.id))

  function addNote(noteId: string) {
    if (!task || task.linkedNoteIds.includes(noteId)) return
    onUpdateTask(task.id, { ...toInput(task), linkedNoteIds: [...task.linkedNoteIds, noteId] })
  }

  function removeNote(noteId: string) {
    if (!task) return
    onUpdateTask(task.id, { ...toInput(task), linkedNoteIds: task.linkedNoteIds.filter((id) => id !== noteId) })
  }

  function addLink(linkId: string) {
    if (!task || task.linkedLinkIds.includes(linkId)) return
    onUpdateTask(task.id, { ...toInput(task), linkedLinkIds: [...task.linkedLinkIds, linkId] })
  }

  function removeLink(linkId: string) {
    if (!task) return
    onUpdateTask(task.id, { ...toInput(task), linkedLinkIds: task.linkedLinkIds.filter((id) => id !== linkId) })
  }

  function changeReminderLeadTime(value: string) {
    if (!task) return
    onUpdateTask(task.id, { ...toInput(task), reminderLeadTime: value === '' ? null : Number(value) })
  }

  return (
    <ModalShell titleId="task-detail-title" onClose={onClose}>
      <h3 id="task-detail-title" className="text-lg font-semibold text-slate-900">
        รายละเอียดงาน
      </h3>

      <div className="mt-4 space-y-5">
        <section>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">What</h4>
          <p className="mt-1 font-medium text-slate-900">{task.title}</p>
          {task.description && <p className="mt-1 text-sm text-slate-600">{task.description}</p>}
          <div className="mt-2 flex flex-wrap gap-2">
            {getLifeAreaName(lifeAreas, task.lifeAreaId) && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                {getLifeAreaName(lifeAreas, task.lifeAreaId)}
              </span>
            )}
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityBadge[task.priority]}`}>
              {task.priority}
            </span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge[task.status]}`}>
              {task.status}
            </span>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">When</h4>
          <p className="mt-1 text-sm text-slate-700">
            {task.dueDate ? `กำหนดส่ง ${task.dueDate} ${task.dueTime || ''}`.trim() : 'ยังไม่กำหนดวันที่'}
          </p>
          <div className="mt-2">
            <label htmlFor="task-detail-reminder" className="text-xs font-medium text-slate-500">
              Reminder (แทนค่า default ของระบบเฉพาะงานนี้)
            </label>
            <select
              id="task-detail-reminder"
              value={task.reminderLeadTime ?? ''}
              onChange={(e) => changeReminderLeadTime(e.target.value)}
              className={`mt-1 ${inputClass}`}
            >
              <option value="">ใช้ค่า default ของระบบ</option>
              {reminderLeadTimeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {task.reminderLeadTime != null && (
              <p className="mt-1 text-xs text-blue-600">ตั้งไว้: {formatLeadTime(task.reminderLeadTime)}</p>
            )}
          </div>
        </section>

        <section className="border-t border-slate-100 pt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Information</h4>

          <div className="mt-2">
            <span className="text-xs font-medium text-slate-500">ไฟล์ที่เกี่ยวข้อง</span>
            <ul className="mt-1 space-y-1">
              {linkedFiles.map((f) => (
                <li
                  key={f.id}
                  className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
                >
                  <button
                    type="button"
                    onClick={() => downloadBlob(f.blob, f.name)}
                    className="min-w-0 flex-1 truncate rounded text-left text-blue-600 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    {f.name} <span className="text-slate-400">({formatBytes(f.size)})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onUnlinkFile(f.id, task.id)}
                    className={`shrink-0 ${dangerLinkButtonClass}`}
                  >
                    ลบออก
                  </button>
                </li>
              ))}
              {linkedFiles.length === 0 && <li className="text-xs text-slate-400">ยังไม่มีไฟล์ที่เชื่อมกับงานนี้</li>}
            </ul>
            <select
              aria-label="แนบไฟล์ที่มีอยู่"
              value=""
              onChange={(e) => e.target.value && onLinkFile(e.target.value, task.id)}
              className={`mt-2 ${inputClass} text-slate-600`}
            >
              <option value="">+ แนบไฟล์ที่มีอยู่...</option>
              {unlinkedFiles.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3">
            <span className="text-xs font-medium text-slate-500">บันทึกที่เกี่ยวข้อง</span>
            <ul className="mt-1 space-y-1">
              {linkedNotes.map((n) => (
                <li
                  key={n.id}
                  className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
                >
                  <span className="min-w-0 flex-1 truncate">{n.title}</span>
                  <button type="button" onClick={() => removeNote(n.id)} className={`shrink-0 ${dangerLinkButtonClass}`}>
                    ลบออก
                  </button>
                </li>
              ))}
              {linkedNotes.length === 0 && <li className="text-xs text-slate-400">ยังไม่มีบันทึกที่เชื่อมกับงานนี้</li>}
            </ul>
            <select
              aria-label="แนบบันทึกที่มีอยู่"
              value=""
              onChange={(e) => e.target.value && addNote(e.target.value)}
              className={`mt-2 ${inputClass} text-slate-600`}
            >
              <option value="">+ แนบบันทึกที่มีอยู่...</option>
              {unlinkedNotes.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3">
            <span className="text-xs font-medium text-slate-500">ลิงก์ที่เกี่ยวข้อง</span>
            <ul className="mt-1 space-y-1">
              {linkedLinks.map((l) => (
                <li
                  key={l.id}
                  className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
                >
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="min-w-0 flex-1 truncate text-blue-600 hover:text-blue-700"
                  >
                    {l.title}
                  </a>
                  <button type="button" onClick={() => removeLink(l.id)} className={`shrink-0 ${dangerLinkButtonClass}`}>
                    ลบออก
                  </button>
                </li>
              ))}
              {linkedLinks.length === 0 && <li className="text-xs text-slate-400">ยังไม่มีลิงก์ที่เชื่อมกับงานนี้</li>}
            </ul>
            <select
              aria-label="แนบลิงก์ที่มีอยู่"
              value=""
              onChange={(e) => e.target.value && addLink(e.target.value)}
              className={`mt-2 ${inputClass} text-slate-600`}
            >
              <option value="">+ แนบลิงก์ที่มีอยู่...</option>
              {unlinkedLinks.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.title}
                </option>
              ))}
            </select>
          </div>
        </section>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="mt-5 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        ปิด
      </button>
    </ModalShell>
  )
}
