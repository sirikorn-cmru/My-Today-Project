import { useEffect, useState } from 'react'
import type { CalendarEvent, CalendarEventInput, LifeArea } from '../types'
import { inputClass, primaryButtonClass, secondaryButtonClass } from '../lib/uiClasses'
import { ModalShell } from './ModalShell'

interface EventFormModalProps {
  open: boolean
  initialEvent?: CalendarEvent | null
  defaultDate?: string
  lifeAreas: LifeArea[]
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
    lifeAreaId: '',
  }
}

export function EventFormModal({ open, initialEvent, defaultDate, lifeAreas, onClose, onSubmit }: EventFormModalProps) {
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
            lifeAreaId: initialEvent.lifeAreaId,
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
    <ModalShell titleId="event-form-title" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h3 id="event-form-title" className="text-lg font-semibold text-slate-900">
          {isEdit ? 'แก้ไขกิจกรรม' : 'เพิ่มกิจกรรม/นัดหมาย'}
        </h3>

        <div className="mt-4 space-y-3">
          <div>
            <label htmlFor="event-title" className="text-xs font-medium text-slate-500">
              ชื่อกิจกรรม *
            </label>
            <input
              id="event-title"
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="เช่น เรียน HCI, ประชุมทีม, นัดหมอ"
              className={`mt-1 ${inputClass}`}
            />
          </div>

          <div>
            <label htmlFor="event-type" className="text-xs font-medium text-slate-500">
              ประเภท
            </label>
            <input
              id="event-type"
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              placeholder="เช่น เรียน, ประชุม, นัดหมาย"
              className={`mt-1 ${inputClass}`}
            />
          </div>

          <div>
            <label htmlFor="event-date" className="text-xs font-medium text-slate-500">
              วันที่ *
            </label>
            <input
              id="event-date"
              required
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className={`mt-1 ${inputClass}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="event-start-time" className="text-xs font-medium text-slate-500">
                เวลาเริ่ม
              </label>
              <input
                id="event-start-time"
                type="time"
                value={form.startTime}
                onChange={(e) => setForm((f) => ({ ...f, startTime: e.target.value }))}
                className={`mt-1 ${inputClass}`}
              />
            </div>
            <div>
              <label htmlFor="event-end-time" className="text-xs font-medium text-slate-500">
                เวลาสิ้นสุด
              </label>
              <input
                id="event-end-time"
                type="time"
                value={form.endTime}
                onChange={(e) => setForm((f) => ({ ...f, endTime: e.target.value }))}
                className={`mt-1 ${inputClass}`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="event-location" className="text-xs font-medium text-slate-500">
              สถานที่
            </label>
            <input
              id="event-location"
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              placeholder="เช่น ห้อง A301"
              className={`mt-1 ${inputClass}`}
            />
          </div>

          <div>
            <label htmlFor="event-description" className="text-xs font-medium text-slate-500">
              รายละเอียด
            </label>
            <textarea
              id="event-description"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={2}
              className={`mt-1 ${inputClass}`}
            />
          </div>

          <div>
            <label htmlFor="event-life-area" className="text-xs font-medium text-slate-500">
              Life Area
            </label>
            <select
              id="event-life-area"
              value={form.lifeAreaId}
              onChange={(e) => setForm((f) => ({ ...f, lifeAreaId: e.target.value }))}
              className={`mt-1 ${inputClass}`}
            >
              <option value="">ไม่ระบุ</option>
              {lifeAreas.map((la) => (
                <option key={la.id} value={la.id}>
                  {la.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button type="button" onClick={onClose} className={`flex-1 ${secondaryButtonClass}`}>
            ยกเลิก
          </button>
          <button type="submit" disabled={!canSubmit} className={`flex-1 ${primaryButtonClass}`}>
            บันทึก
          </button>
        </div>
      </form>
    </ModalShell>
  )
}
