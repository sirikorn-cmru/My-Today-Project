import { useEffect, useState } from 'react'
import type { LifeArea, Link, LinkInput } from '../types'
import { inputClass, primaryButtonClass, secondaryButtonClass } from '../lib/uiClasses'
import { ModalShell } from './ModalShell'

interface LinkFormModalProps {
  open: boolean
  initialLink?: Link | null
  lifeAreas: LifeArea[]
  onClose: () => void
  onSubmit: (input: LinkInput) => void
  // Quick Capture mode (Sprint 8): ชื่ออย่างเดียวก็บันทึกได้ — URL/Life Area ไปเติมทีหลังได้
  quickCapture?: boolean
}

const emptyForm: LinkInput = { title: '', url: '', lifeAreaId: '', inInbox: false }

export function LinkFormModal({ open, initialLink, lifeAreas, onClose, onSubmit, quickCapture }: LinkFormModalProps) {
  const [form, setForm] = useState<LinkInput>(emptyForm)

  useEffect(() => {
    if (!open) return
    setForm(
      initialLink
        ? { title: initialLink.title, url: initialLink.url, lifeAreaId: initialLink.lifeAreaId, inInbox: initialLink.inInbox }
        : emptyForm,
    )
  }, [open, initialLink])

  if (!open) return null

  const isEdit = Boolean(initialLink)
  const canSubmit = form.title.trim().length > 0 && (quickCapture || form.url.trim().length > 0)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    onSubmit({ ...form, inInbox: Boolean(quickCapture) })
  }

  return (
    <ModalShell titleId="link-form-title" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h3 id="link-form-title" className="text-lg font-semibold text-slate-900">
          {quickCapture ? '+ Add to My Today — ลิงก์' : isEdit ? 'แก้ไขลิงก์' : 'เพิ่มลิงก์ (Link)'}
        </h3>
        {quickCapture && (
          <p className="mt-1 text-xs text-slate-500">
            กรอกแค่ชื่อก่อนได้ URL/Life Area ไปเติมทีหลังได้ที่ My Inbox
          </p>
        )}

        <div className="mt-4 space-y-3">
          <div>
            <label htmlFor="link-title" className="text-xs font-medium text-slate-500">
              ชื่อ *
            </label>
            <input
              id="link-title"
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="เช่น ใบสมัครทุนการศึกษา"
              className={`mt-1 ${inputClass}`}
            />
          </div>

          <div>
            <label htmlFor="link-url" className="text-xs font-medium text-slate-500">
              URL {quickCapture ? '' : '*'}
            </label>
            <input
              id="link-url"
              required={!quickCapture}
              type="url"
              value={form.url}
              onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
              placeholder="https://..."
              className={`mt-1 ${inputClass}`}
            />
          </div>

          <div>
            <label htmlFor="link-life-area" className="text-xs font-medium text-slate-500">
              Life Area
            </label>
            <select
              id="link-life-area"
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
