import { useEffect, useState } from 'react'
import type { FileRecord, FileRecordInput, LifeArea, Task } from '../types'
import { inputClass, primaryButtonClass, secondaryButtonClass } from '../lib/uiClasses'
import { ModalShell } from './ModalShell'

interface FileFormModalProps {
  open: boolean
  tasks: Task[]
  lifeAreas: LifeArea[]
  onClose: () => void
  onSubmit: (input: FileRecordInput) => void
  // Edit/organize mode: ปรับชื่อ/หมวดหมู่/Life Area ของไฟล์ที่มีอยู่แล้ว (ไม่เลือกไฟล์ใหม่)
  initialFile?: FileRecord | null
  onUpdate?: (
    id: string,
    patch: Partial<Pick<FileRecord, 'name' | 'category' | 'lifeAreaId' | 'linkedTaskIds' | 'linkedEventIds' | 'inInbox'>>,
  ) => void
  // Quick Capture mode (Sprint 8): ตั้ง inInbox=true ตอนสร้างใหม่ผ่านปุ่มกลาง — ยังต้องเลือกไฟล์เสมอ
  // (ไฟล์ที่ไม่มีเนื้อหาไม่มีความหมาย) แต่ชื่อ/หมวดหมู่/Life Area ไปกรอกทีหลังได้ที่ My Inbox
  quickCapture?: boolean
}

export function FileFormModal({
  open,
  tasks,
  lifeAreas,
  onClose,
  onSubmit,
  initialFile,
  onUpdate,
  quickCapture,
}: FileFormModalProps) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [lifeAreaId, setLifeAreaId] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [linkedTaskIds, setLinkedTaskIds] = useState<string[]>([])

  const isEdit = Boolean(initialFile)

  useEffect(() => {
    if (!open) return
    if (initialFile) {
      setName(initialFile.name)
      setCategory(initialFile.category)
      setLifeAreaId(initialFile.lifeAreaId)
      setLinkedTaskIds(initialFile.linkedTaskIds)
      setFile(null)
    } else {
      setName('')
      setCategory('')
      setLifeAreaId('')
      setFile(null)
      setLinkedTaskIds([])
    }
  }, [open, initialFile])

  if (!open) return null

  const canSubmit = name.trim().length > 0 && (isEdit || file !== null)

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
    if (!canSubmit) return
    if (isEdit && initialFile) {
      onUpdate?.(initialFile.id, {
        name: name.trim(),
        category: category.trim() || 'ทั่วไป',
        lifeAreaId,
        linkedTaskIds,
        inInbox: false,
      })
      return
    }
    if (!file) return
    onSubmit({
      name: name.trim(),
      category: category.trim() || 'ทั่วไป',
      lifeAreaId,
      linkedTaskIds,
      linkedEventIds: [],
      mimeType: file.type || 'application/octet-stream',
      size: file.size,
      blob: file,
      inInbox: Boolean(quickCapture),
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
          {quickCapture ? '+ Add to My Today — ไฟล์' : isEdit ? 'จัดเข้า Life Area' : 'เพิ่มไฟล์'}
        </h3>
        {quickCapture && (
          <p className="mt-1 text-xs text-slate-500">
            เลือกไฟล์แล้วบันทึกได้เลย ตั้งชื่อ/หมวดหมู่/Life Area ทีหลังได้ที่ My Inbox
          </p>
        )}

        <div className="mt-4 space-y-3">
          {!isEdit && (
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
          )}

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

          {!quickCapture && tasks.length > 0 && (
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
