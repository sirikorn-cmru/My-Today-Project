import { useState } from 'react'
import { Footer } from '../components/Footer'
import {
  cardClass,
  dangerLinkButtonClass,
  emptyStateClass,
  inputClass,
  linkButtonClass,
  pageHeaderClass,
  primaryButtonClass,
  secondaryButtonClass,
} from '../lib/uiClasses'
import type { LifeArea, LifeAreaInput } from '../types'

interface LifeAreasPageProps {
  lifeAreas: LifeArea[]
  addLifeArea: (input: LifeAreaInput) => void
  updateLifeArea: (id: string, input: LifeAreaInput) => void
  deleteLifeArea: (id: string) => void
}

export function LifeAreasPage({ lifeAreas, addLifeArea, updateLifeArea, deleteLifeArea }: LifeAreasPageProps) {
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    const name = newName.trim()
    if (!name) return
    addLifeArea({ name })
    setNewName('')
  }

  function startEdit(lifeArea: LifeArea) {
    setEditingId(lifeArea.id)
    setEditingName(lifeArea.name)
  }

  function saveEdit(id: string) {
    const name = editingName.trim()
    if (name) updateLifeArea(id, { name })
    setEditingId(null)
  }

  function handleDelete(lifeArea: LifeArea) {
    const confirmed = window.confirm(
      `ลบ Life Area "${lifeArea.name}" ใช่หรือไม่? งาน/กิจกรรม/ไฟล์ที่เคยผูกไว้จะยังอยู่ครบ แค่ไม่มี Life Area นี้แล้ว`,
    )
    if (confirmed) deleteLifeArea(lifeArea.id)
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <header className={pageHeaderClass}>
        <h1 className="text-xl font-semibold">Life Area / Workspace</h1>
        <p className="mt-1 text-sm text-blue-100">จัดกลุ่มงาน กิจกรรม และไฟล์ตามบริบทชีวิตของคุณ</p>
      </header>

      <section className="px-4 py-4 sm:px-6">
        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="เช่น Work, Study, Family, Finance"
            aria-label="ชื่อ Life Area ใหม่"
            className={`flex-1 ${inputClass}`}
          />
          <button type="submit" disabled={!newName.trim()} className={primaryButtonClass}>
            + เพิ่ม
          </button>
        </form>
      </section>

      <section className="px-4 sm:px-6">
        <ul className="space-y-2">
          {lifeAreas.map((la) => (
            <li key={la.id} className={`${cardClass} p-3`}>
              {editingId === la.id ? (
                <div className="flex gap-2">
                  <input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    aria-label={`แก้ไขชื่อ ${la.name}`}
                    className={`flex-1 ${inputClass}`}
                    autoFocus
                  />
                  <button type="button" onClick={() => saveEdit(la.id)} className={primaryButtonClass}>
                    บันทึก
                  </button>
                  <button type="button" onClick={() => setEditingId(null)} className={secondaryButtonClass}>
                    ยกเลิก
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-slate-900">{la.name}</p>
                  <div className="flex shrink-0 gap-3">
                    <button type="button" onClick={() => startEdit(la)} className={linkButtonClass}>
                      แก้ไข
                    </button>
                    <button type="button" onClick={() => handleDelete(la)} className={dangerLinkButtonClass}>
                      ลบ
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
          {lifeAreas.length === 0 && <li className={emptyStateClass}>ยังไม่มี Life Area — เพิ่มอันแรกด้านบนได้เลย</li>}
        </ul>
      </section>
      <Footer />
    </div>
  )
}
