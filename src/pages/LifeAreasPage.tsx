import { useState } from 'react'
import { Footer } from '../components/Footer'
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
      <header className="bg-blue-600 px-4 py-6 text-white sm:px-6">
        <h1 className="text-xl font-semibold">Life Area / Workspace</h1>
        <p className="mt-1 text-sm text-blue-100">จัดกลุ่มงาน กิจกรรม และไฟล์ตามบริบทชีวิตของคุณ</p>
      </header>

      <section className="px-4 py-4 sm:px-6">
        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="เช่น Work, Study, Family, Finance"
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={!newName.trim()}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            + เพิ่ม
          </button>
        </form>
      </section>

      <section className="px-4 sm:px-6">
        <ul className="space-y-2">
          {lifeAreas.map((la) => (
            <li key={la.id} className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
              {editingId === la.id ? (
                <div className="flex gap-2">
                  <input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => saveEdit(la.id)}
                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white"
                  >
                    บันทึก
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600"
                  >
                    ยกเลิก
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-slate-900">{la.name}</p>
                  <div className="flex shrink-0 gap-3">
                    <button
                      type="button"
                      onClick={() => startEdit(la)}
                      className="text-xs font-medium text-blue-600"
                    >
                      แก้ไข
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(la)}
                      className="text-xs font-medium text-rose-600"
                    >
                      ลบ
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
          {lifeAreas.length === 0 && (
            <li className="rounded-xl bg-white p-4 text-center text-sm text-slate-500 shadow-sm ring-1 ring-slate-200">
              ยังไม่มี Life Area — เพิ่มอันแรกด้านบนได้เลย
            </li>
          )}
        </ul>
      </section>
      <Footer />
    </div>
  )
}
