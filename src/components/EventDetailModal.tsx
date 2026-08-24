import type { CalendarEvent, CalendarEventInput, FileRecord, LifeArea, Link, Note } from '../types'
import { downloadBlob, formatBytes } from '../lib/fileUtils'
import { formatLeadTime, reminderLeadTimeOptions } from '../lib/taskUtils'
import { getLifeAreaName } from '../lib/lifeAreaUtils'
import { dangerLinkButtonClass, inputClass } from '../lib/uiClasses'
import { ModalShell } from './ModalShell'

interface EventDetailModalProps {
  open: boolean
  event: CalendarEvent | null
  lifeAreas: LifeArea[]
  files: FileRecord[]
  notes: Note[]
  links: Link[]
  onClose: () => void
  onUpdateEvent: (id: string, input: CalendarEventInput) => void
  onLinkFile: (fileId: string, eventId: string) => void
  onUnlinkFile: (fileId: string, eventId: string) => void
}

function toInput(event: CalendarEvent): CalendarEventInput {
  const { id: _id, createdAt: _createdAt, ...input } = event
  return input
}

// Sprint 10 Business Rule 4: Event เชื่อมกับ Note/Link/File ได้เช่นเดียวกับ Task ด้วยกลไกเดียวกัน
// — What/When/Information เดียวกับ TaskDetailModal แค่ไม่มี Priority/Status เพราะ Event ไม่มีสองฟิลด์นี้
export function EventDetailModal({
  open,
  event,
  lifeAreas,
  files,
  notes,
  links,
  onClose,
  onUpdateEvent,
  onLinkFile,
  onUnlinkFile,
}: EventDetailModalProps) {
  if (!open || !event) return null

  const linkedFiles = files.filter((f) => f.linkedEventIds.includes(event.id))
  const unlinkedFiles = files.filter((f) => !f.linkedEventIds.includes(event.id))
  const linkedNotes = notes.filter((n) => event.linkedNoteIds.includes(n.id))
  const unlinkedNotes = notes.filter((n) => !event.linkedNoteIds.includes(n.id))
  const linkedLinks = links.filter((l) => event.linkedLinkIds.includes(l.id))
  const unlinkedLinks = links.filter((l) => !event.linkedLinkIds.includes(l.id))

  function addNote(noteId: string) {
    if (!event || event.linkedNoteIds.includes(noteId)) return
    onUpdateEvent(event.id, { ...toInput(event), linkedNoteIds: [...event.linkedNoteIds, noteId] })
  }

  function removeNote(noteId: string) {
    if (!event) return
    onUpdateEvent(event.id, { ...toInput(event), linkedNoteIds: event.linkedNoteIds.filter((id) => id !== noteId) })
  }

  function addLink(linkId: string) {
    if (!event || event.linkedLinkIds.includes(linkId)) return
    onUpdateEvent(event.id, { ...toInput(event), linkedLinkIds: [...event.linkedLinkIds, linkId] })
  }

  function removeLink(linkId: string) {
    if (!event) return
    onUpdateEvent(event.id, { ...toInput(event), linkedLinkIds: event.linkedLinkIds.filter((id) => id !== linkId) })
  }

  function changeReminderLeadTime(value: string) {
    if (!event) return
    onUpdateEvent(event.id, { ...toInput(event), reminderLeadTime: value === '' ? null : Number(value) })
  }

  return (
    <ModalShell titleId="event-detail-title" onClose={onClose}>
      <h3 id="event-detail-title" className="text-lg font-semibold text-slate-900">
        รายละเอียดกิจกรรม
      </h3>

      <div className="mt-4 space-y-5">
        <section>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">What</h4>
          <p className="mt-1 font-medium text-slate-900">{event.title}</p>
          {event.description && <p className="mt-1 text-sm text-slate-600">{event.description}</p>}
          <div className="mt-2 flex flex-wrap gap-2">
            {getLifeAreaName(lifeAreas, event.lifeAreaId) && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                {getLifeAreaName(lifeAreas, event.lifeAreaId)}
              </span>
            )}
            {event.location && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                {event.location}
              </span>
            )}
          </div>
        </section>

        <section className="border-t border-slate-100 pt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">When</h4>
          <p className="mt-1 text-sm text-slate-700">
            {event.date
              ? `${event.date} ${event.endTime ? `${event.startTime}-${event.endTime}` : event.startTime || ''}`.trim()
              : 'ยังไม่กำหนดวันที่'}
          </p>
          <div className="mt-2">
            <label htmlFor="event-detail-reminder" className="text-xs font-medium text-slate-500">
              Reminder (แทนค่า default ของระบบเฉพาะกิจกรรมนี้)
            </label>
            <select
              id="event-detail-reminder"
              value={event.reminderLeadTime ?? ''}
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
            {event.reminderLeadTime != null && (
              <p className="mt-1 text-xs text-blue-600">ตั้งไว้: {formatLeadTime(event.reminderLeadTime)}</p>
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
                    onClick={() => onUnlinkFile(f.id, event.id)}
                    className={`shrink-0 ${dangerLinkButtonClass}`}
                  >
                    ลบออก
                  </button>
                </li>
              ))}
              {linkedFiles.length === 0 && <li className="text-xs text-slate-400">ยังไม่มีไฟล์ที่เชื่อมกับกิจกรรมนี้</li>}
            </ul>
            <select
              aria-label="แนบไฟล์ที่มีอยู่"
              value=""
              onChange={(e) => e.target.value && onLinkFile(e.target.value, event.id)}
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
              {linkedNotes.length === 0 && <li className="text-xs text-slate-400">ยังไม่มีบันทึกที่เชื่อมกับกิจกรรมนี้</li>}
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
              {linkedLinks.length === 0 && <li className="text-xs text-slate-400">ยังไม่มีลิงก์ที่เชื่อมกับกิจกรรมนี้</li>}
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
