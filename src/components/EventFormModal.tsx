import { useEffect, useState } from 'react'
import type { CalendarEvent, CalendarEventInput } from '../types'

interface EventFormModalProps {
  open: boolean
  initialEvent?: CalendarEvent | null
  defaultDate?: string
  onClose: () => void
  onSubmit: (input: CalendarEventInput) => void
}

function emptyForm(defaultDate?: string): CalendarEventInput {
  return {
    title: '',
    type: '',
    date: defaultDate ?? '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
  }
}

export function EventFormModal({ open, initialEvent, defaultDate, onClose, onSubmit }: EventFormModalProps) {
  const [form, setForm] = useState<CalendarEventInput>(emptyForm(defaultDate))

  useEffect(() => {
    if (!open) return
    setForm(
      initialEvent
        ? {
            title: initialEvent.title,
            type: initialEvent.type,
            date: initialEvent.date,
            startTime: initialEvent.startTime,
            endTime: initialEvent.endTime,
            location: initialEvent.location,
            description: initialEvent.description,
          }
        : emptyForm(defaultDate),
    )
  }, [open, initialEvent, defaultDate])

  if (!open) return null

  const isEdit = Boolean(initialEvent)
  const canSubmit = form.title.trim().length > 0 && form.date.trim().length > 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    onSubmit(form)
  }

  return (
    <div
      className="fixed inset-0 z-20 flex items-end justify-center overflow-y-auto bg-slate-900/40 sm:items-center"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-t-2xl bg-white p-5 shadow-lg sm:my-8 sm:rounded-2xl"
      >
        <h3 className="text-lg font-semibold text-slate-900">{isEdit ? 'แก้ไขกิจกรรม' : 'เพิ่มกิจกรรม/นัดหมาย'}</h3>

        <div className="mt-4 space-y-3">
          <div>
            <label className="text-xs font-medium text-slate-500">ชื่อกิจกรรม *</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="เช่น เรียน HCI, ประชุมทีม, นัดหมอ"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">ประเภท</label>
            <input
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              placeholder="เช่น เรียน, ประชุม, นัดหมาย"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">วันที่ *</label>
            <input
              required
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">เวลาเริ่ม</label>
              <input
                type="time"
                value={form.startTime}
                onChange={(e) => setForm((f) => ({ ...f, startTime: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">เวลาสิ้นสุด</label>
              <input
                type="time"
                value={form.endTime}
                onChange={(e) => setForm((f) => ({ ...f, endTime: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">สถานที่</label>
            <input
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              placeholder="เช่น ห้อง A301"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">รายละเอียด</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={2}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
            />
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-600"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            บันทึก
          </button>
        </div>
      </form>
    </div>
  )
}
