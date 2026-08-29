import { useEffect, useState } from 'react'
import type { FileRecord, LifeArea, Priority, Task, TaskInput, TaskStatus } from '../types'
import { downloadBlob, formatBytes } from '../lib/fileUtils'
import { dangerLinkButtonClass, inputClass, primaryButtonClass, secondaryButtonClass } from '../lib/uiClasses'
import { ModalShell } from './ModalShell'

interface TaskFormModalProps {
  open: boolean
  initialTask?: Task | null
  lifeAreas: LifeArea[]
  onClose: () => void
  onSubmit: (input: TaskInput) => void
  files?: FileRecord[]
  onLinkFile?: (fileId: string) => void
  onUnlinkFile?: (fileId: string) => void
}

const emptyForm: TaskInput = {
  title: '',
  description: '',
  lifeAreaId: '',
  dueDate: '',
  dueTime: '',
  priority: 'Medium',
  status: 'To Do',
}

export function TaskFormModal({
  open,
  initialTask,
  lifeAreas,
  onClose,
  onSubmit,
  files,
  onLinkFile,
  onUnlinkFile,
}: TaskFormModalProps) {
  const [form, setForm] = useState<TaskInput>(emptyForm)

  useEffect(() => {
    if (!open) return
    setForm(
      initialTask
        ? {
            title: initialTask.title,
            description: initialTask.description,
            lifeAreaId: initialTask.lifeAreaId,
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
    <ModalShell titleId="task-form-title" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h3 id="task-form-title" className="text-lg font-semibold text-slate-900">
          {isEdit ? 'แก้ไขงาน' : 'เพิ่มงานใหม่'}
        </h3>

        <div className="mt-4 space-y-3">
          <div>
            <label htmlFor="task-title" className="text-xs font-medium text-slate-500">
              ชื่องาน *
            </label>
            <input
              id="task-title"
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="เช่น ส่งรายงาน STEM"
              className={`mt-1 ${inputClass}`}
            />
          </div>

          <div>
            <label htmlFor="task-description" className="text-xs font-medium text-slate-500">
              รายละเอียด
            </label>
            <textarea
              id="task-description"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="รายละเอียดเพิ่มเติม (ถ้ามี)"
              rows={2}
              className={`mt-1 ${inputClass}`}
            />
          </div>

          <div>
            <label htmlFor="task-life-area" className="text-xs font-medium text-slate-500">
              Life Area
            </label>
            <select
              id="task-life-area"
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="task-due-date" className="text-xs font-medium text-slate-500">
                วันที่กำหนดส่ง *
              </label>
              <input
                id="task-due-date"
                required
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
                className={`mt-1 ${inputClass}`}
              />
            </div>
            <div>
              <label htmlFor="task-due-time" className="text-xs font-medium text-slate-500">
                เวลา
              </label>
              <input
                id="task-due-time"
                type="time"
                value={form.dueTime}
                onChange={(e) => setForm((f) => ({ ...f, dueTime: e.target.value }))}
                className={`mt-1 ${inputClass}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="task-priority" className="text-xs font-medium text-slate-500">
                Priority
              </label>
              <select
                id="task-priority"
                value={form.priority}
                onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value as Priority }))}
                className={`mt-1 ${inputClass}`}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label htmlFor="task-status" className="text-xs font-medium text-slate-500">
                Status
              </label>
              <select
                id="task-status"
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as TaskStatus }))}
                className={`mt-1 ${inputClass}`}
              >
                <option value="To Do">To Do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>

          {isEdit && files && initialTask && (
            <div>
              <label className="text-xs font-medium text-slate-500">ไฟล์ที่เกี่ยวข้อง (Related Files)</label>
              <ul className="mt-1 space-y-1">
                {files
                  .filter((f) => f.linkedTaskIds.includes(initialTask.id))
                  .map((f) => (
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
                      {onUnlinkFile && (
                        <button
                          type="button"
                          onClick={() => onUnlinkFile(f.id)}
                          className={`shrink-0 ${dangerLinkButtonClass}`}
                        >
                          ลบออก
                        </button>
                      )}
                    </li>
                  ))}
                {files.filter((f) => f.linkedTaskIds.includes(initialTask.id)).length === 0 && (
                  <li className="text-xs text-slate-400">ยังไม่มีไฟล์ที่เชื่อมกับงานนี้</li>
                )}
              </ul>
              {onLinkFile && (
                <select
                  aria-label="แนบไฟล์ที่มีอยู่"
                  value=""
                  onChange={(e) => {
                    if (e.target.value) onLinkFile(e.target.value)
                  }}
                  className={`mt-2 ${inputClass} text-slate-600`}
                >
                  <option value="">+ แนบไฟล์ที่มีอยู่...</option>
                  {files
                    .filter((f) => !f.linkedTaskIds.includes(initialTask.id))
                    .map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                </select>
              )}
            </div>
          )}
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
