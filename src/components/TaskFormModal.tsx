import { useEffect, useState } from 'react'
import type { Priority, Task, TaskInput, TaskStatus } from '../types'

interface TaskFormModalProps {
  open: boolean
  initialTask?: Task | null
  onClose: () => void
  onSubmit: (input: TaskInput) => void
}

const emptyForm: TaskInput = {
  title: '',
  description: '',
  subject: '',
  dueDate: '',
  dueTime: '',
  priority: 'Medium',
  status: 'To Do',
}

export function TaskFormModal({ open, initialTask, onClose, onSubmit }: TaskFormModalProps) {
  const [form, setForm] = useState<TaskInput>(emptyForm)

  useEffect(() => {
    if (!open) return
    setForm(
      initialTask
        ? {
            title: initialTask.title,
            description: initialTask.description,
            subject: initialTask.subject,
            dueDate: initialTask.dueDate,
            dueTime: initialTask.dueTime,
            priority: initialTask.priority,
            status: initialTask.status,
          }
        : emptyForm,
    )
  }, [open, initialTask])

  if (!open) return null

  const isEdit = Boolean(initialTask)
  const canSubmit = form.title.trim().length > 0 && form.dueDate.trim().length > 0

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
        <h3 className="text-lg font-semibold text-slate-900">{isEdit ? 'แก้ไขงาน' : 'เพิ่มงานใหม่'}</h3>

        <div className="mt-4 space-y-3">
          <div>
            <label className="text-xs font-medium text-slate-500">ชื่องาน *</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="เช่น ส่งรายงาน STEM"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">รายละเอียด</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="รายละเอียดเพิ่มเติม (ถ้ามี)"
              rows={2}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">รายวิชา</label>
            <input
              value={form.subject}
              onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
              placeholder="เช่น STEM 101"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">วันที่กำหนดส่ง *</label>
              <input
                required
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">เวลา</label>
              <input
                type="time"
                value={form.dueTime}
                onChange={(e) => setForm((f) => ({ ...f, dueTime: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value as Priority }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as TaskStatus }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
              >
                <option value="To Do">To Do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
            </div>
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
