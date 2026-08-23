import { useEffect, useState } from 'react'
import type { LifeArea, Note, NoteInput } from '../types'
import { inputClass, primaryButtonClass, secondaryButtonClass } from '../lib/uiClasses'
import { ModalShell } from './ModalShell'

interface NoteFormModalProps {
  open: boolean
  initialNote?: Note | null
  lifeAreas: LifeArea[]
  onClose: () => void
  onSubmit: (input: NoteInput) => void
  // Quick Capture mode (Sprint 8): ชื่อ/หัวข้ออย่างเดียวก็บันทึกได้ — เนื้อหา/Life Area ไปเติมทีหลังได้
  quickCapture?: boolean
}

const emptyForm: NoteInput = { title: '', content: '', lifeAreaId: '', inInbox: false }

export function NoteFormModal({ open, initialNote, lifeAreas, onClose, onSubmit, quickCapture }: NoteFormModalProps) {
  const [form, setForm] = useState<NoteInput>(emptyForm)

  useEffect(() => {
    if (!open) return
    setForm(
      initialNote
        ? {
            title: initialNote.title,
            content: initialNote.content,
            lifeAreaId: initialNote.lifeAreaId,
            inInbox: initialNote.inInbox,
          }
        : emptyForm,
    )
  }, [open, initialNote])

  if (!open) return null

  const isEdit = Boolean(initialNote)
  const canSubmit = form.title.trim().length > 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    onSubmit({ ...form, inInbox: Boolean(quickCapture) })
  }

  return (
    <ModalShell titleId="note-form-title" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h3 id="note-form-title" className="text-lg font-semibold text-slate-900">
          {quickCapture ? '+ Add to My Today — บันทึก' : isEdit ? 'แก้ไขบันทึก' : 'เพิ่มบันทึก (Note)'}
        </h3>
        {quickCapture && (
          <p className="mt-1 text-xs text-slate-500">
            กรอกแค่หัวข้อก่อนได้ เนื้อหา/Life Area ไปเติมทีหลังได้ที่ My Inbox
          </p>
        )}

        <div className="mt-4 space-y-3">
          <div>
            <label htmlFor="note-title" className="text-xs font-medium text-slate-500">
              หัวข้อ *
            </label>
            <input
              id="note-title"
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="เช่น รหัสตู้ล็อกเกอร์"
              className={`mt-1 ${inputClass}`}
            />
          </div>

          <div>
            <label htmlFor="note-content" className="text-xs font-medium text-slate-500">
              เนื้อหา
            </label>
            <textarea
              id="note-content"
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              placeholder="รายละเอียดที่ต้องจำ (ถ้ามี)"
              rows={3}
              className={`mt-1 ${inputClass}`}
            />
          </div>

          <div>
            <label htmlFor="note-life-area" className="text-xs font-medium text-slate-500">
              Life Area
            </label>
            <select
              id="note-life-area"
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
