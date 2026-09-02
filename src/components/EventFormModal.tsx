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
  // Quick Capture mode (Sprint 8): only "ชื่อกิจกรรม" is required — วันที่และฟิลด์อื่นๆ
  // ถูกเลื่อนไปกรอกทีหลังตอน "จัดเข้า Life Area" จาก Inbox
  quickCapture?: boolean
  // Sprint 13: ค่าที่ AI สกัดจากรูปภาพมาเติมให้ล่วงหน้า — ผู้ใช้ยังต้องตรวจสอบ/แก้ไข/กด
  // "บันทึก" เองเสมอ (ไม่ auto-submit) ต่างจาก initialEvent ตรงที่นี่ไม่ใช่การแก้ไข record
  // ที่มีอยู่แล้ว (isEdit ยังคงเป็น false, หัวข้อฟอร์มยังคงเป็น Quick Capture ปกติ)
  prefill?: Partial<CalendarEventInput>
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
    inInbox: false,
    linkedNoteIds: [],
    linkedLinkIds: [],
    reminderLeadTime: null,
  }
}

export function EventFormModal({
  open,
  initialEvent,
  defaultDate,
  lifeAreas,
  onClose,
  onSubmit,
  quickCapture,
  prefill,
}: EventFormModalProps) {
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
            inInbox: initialEvent.inInbox,
            // ฟิลด์ Sprint 10 (Note/Link/Reminder) แก้ผ่าน Event Detail เท่านั้น — ฟอร์มนี้แค่ผ่านค่าเดิม
            // ต่อไปเฉยๆ ไม่ให้หายตอนแก้ไขฟิลด์อื่นในฟอร์มนี้
            linkedNoteIds: initialEvent.linkedNoteIds,
            linkedLinkIds: initialEvent.linkedLinkIds,
            reminderLeadTime: initialEvent.reminderLeadTime,
          }
        : { ...emptyForm(defaultDate), ...prefill },
    )
  }, [open, initialEvent, defaultDate, prefill])

  if (!open) return null

  const isEdit = Boolean(initialEvent)
  const canSubmit = form.title.trim().length > 0 && (quickCapture || form.date.trim().length > 0)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    onSubmit({ ...form, inInbox: Boolean(quickCapture) })
  }

  return (
    <ModalShell titleId="event-form-title" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h3 id="event-form-title" className="text-lg font-semibold text-slate-900">
          {quickCapture ? '+ Add to My Today — กิจกรรม' : isEdit ? 'แก้ไขกิจกรรม' : 'เพิ่มกิจกรรม/นัดหมาย'}
        </h3>
        {quickCapture && (
          <p className="mt-1 text-xs text-slate-500">
            กรอกแค่ชื่อกิจกรรมก่อนได้ รายละเอียดอื่นๆ ไปกรอกทีหลังตอนจัดเข้า Life Area ที่ My Inbox
          </p>
        )}

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
              วันที่ {quickCapture ? '' : '*'}
            </label>
            <input
              id="event-date"
              required={!quickCapture}
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
