import { useState } from 'react'
import type { FileRecordInput, Task } from '../types'

interface FileFormModalProps {
  open: boolean
  tasks: Task[]
  onClose: () => void
  onSubmit: (input: FileRecordInput) => void
}

export function FileFormModal({ open, tasks, onClose, onSubmit }: FileFormModalProps) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [linkedTaskIds, setLinkedTaskIds] = useState<string[]>([])

  if (!open) return null

  const canSubmit = name.trim().length > 0 && file !== null

  function reset() {
    setName('')
    setCategory('')
    setFile(null)
    setLinkedTaskIds([])
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0] ?? null
    setFile(picked)
    if (picked && !name) setName(picked.name)
  }

  function toggleTask(taskId: string) {
    setLinkedTaskIds((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file || !canSubmit) return
    onSubmit({
      name: name.trim(),
      category: category.trim() || 'ทั่วไป',
      linkedTaskIds,
      mimeType: file.type || 'application/octet-stream',
      size: file.size,
      blob: file,
    })
    reset()
  }

  function handleClose() {
    reset()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-20 flex items-end justify-center overflow-y-auto bg-slate-900/40 sm:items-center"
      onClick={handleClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-t-2xl bg-white p-5 shadow-lg sm:my-8 sm:rounded-2xl"
      >
        <h3 className="text-lg font-semibold text-slate-900">เพิ่มไฟล์</h3>

        <div className="mt-4 space-y-3">
          <div>
            <label className="text-xs font-medium text-slate-500">เลือกไฟล์ *</label>
            <input
              required
              type="file"
              onChange={handleFileChange}
              className="mt-1 w-full text-sm text-slate-600"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">ชื่อไฟล์ *</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="เช่น report.docx"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">หมวดหมู่</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="เช่น เอกสาร, รูปภาพ"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
            />
          </div>

          {tasks.length > 0 && (
            <div>
              <label className="text-xs font-medium text-slate-500">เชื่อมกับงาน (ไม่บังคับ)</label>
              <div className="mt-1 max-h-32 space-y-1 overflow-y-auto rounded-lg border border-slate-200 p-2">
                {tasks.map((task) => (
                  <label key={task.id} className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={linkedTaskIds.includes(task.id)}
                      onChange={() => toggleTask(task.id)}
                    />
                    <span className="truncate">{task.title}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={handleClose}
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
