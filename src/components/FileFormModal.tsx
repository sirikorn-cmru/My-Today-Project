import { useState } from 'react'
import type { FileRecordInput, LifeArea, Task } from '../types'
import { inputClass, primaryButtonClass, secondaryButtonClass } from '../lib/uiClasses'
import { ModalShell } from './ModalShell'

interface FileFormModalProps {
  open: boolean
  tasks: Task[]
  lifeAreas: LifeArea[]
  onClose: () => void
  onSubmit: (input: FileRecordInput) => void
}

export function FileFormModal({ open, tasks, lifeAreas, onClose, onSubmit }: FileFormModalProps) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [lifeAreaId, setLifeAreaId] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [linkedTaskIds, setLinkedTaskIds] = useState<string[]>([])

  if (!open) return null

  const canSubmit = name.trim().length > 0 && file !== null

  function reset() {
    setName('')
    setCategory('')
    setLifeAreaId('')
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
      lifeAreaId,
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
    <ModalShell titleId="file-form-title" onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h3 id="file-form-title" className="text-lg font-semibold text-slate-900">
          เพิ่มไฟล์
        </h3>

        <div className="mt-4 space-y-3">
          <div>
            <label htmlFor="file-input" className="text-xs font-medium text-slate-500">
              เลือกไฟล์ *
            </label>
            <input
              id="file-input"
              required
              type="file"
              onChange={handleFileChange}
              className="mt-1 w-full rounded-lg text-sm text-slate-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="file-name" className="text-xs font-medium text-slate-500">
              ชื่อไฟล์ *
            </label>
            <input
              id="file-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="เช่น report.docx"
              className={`mt-1 ${inputClass}`}
            />
          </div>

          <div>
            <label htmlFor="file-category" className="text-xs font-medium text-slate-500">
              หมวดหมู่
            </label>
            <input
              id="file-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="เช่น เอกสาร, รูปภาพ"
              className={`mt-1 ${inputClass}`}
            />
          </div>

          <div>
            <label htmlFor="file-life-area" className="text-xs font-medium text-slate-500">
              Life Area
            </label>
            <select
              id="file-life-area"
              value={lifeAreaId}
              onChange={(e) => setLifeAreaId(e.target.value)}
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

          {tasks.length > 0 && (
            <div>
              <span className="text-xs font-medium text-slate-500">เชื่อมกับงาน (ไม่บังคับ)</span>
              <div className="mt-1 max-h-32 space-y-1 overflow-y-auto rounded-lg border border-slate-200 p-2">
                {tasks.map((task) => (
                  <label key={task.id} className="flex items-center gap-2 rounded p-1 text-sm text-slate-700 hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={linkedTaskIds.includes(task.id)}
                      onChange={() => toggleTask(task.id)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                    <span className="truncate">{task.title}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 flex gap-2">
          <button type="button" onClick={handleClose} className={`flex-1 ${secondaryButtonClass}`}>
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
