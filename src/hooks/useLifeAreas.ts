import { useEffect, useState } from 'react'
import type { LifeArea, LifeAreaInput } from '../types'
import { readJSON, writeJSON } from '../lib/storage'
import { createSeedLifeAreas } from '../data/seedLifeAreas'

const STORAGE_KEY = 'my-today:life-areas'

// Sprint 12: record เดิมก่อน Sprint นี้ไม่มี updatedAt — ใช้ createdAt แทนเป็นค่าเริ่มต้น
function normalizeLifeArea(lifeArea: LifeArea): LifeArea {
  return { ...lifeArea, updatedAt: lifeArea.updatedAt ?? lifeArea.createdAt }
}

function loadInitialLifeAreas(): LifeArea[] {
  const stored = readJSON<LifeArea[] | null>(STORAGE_KEY, null)
  if (stored) return stored.map(normalizeLifeArea)
  const seeded = createSeedLifeAreas()
  writeJSON(STORAGE_KEY, seeded)
  return seeded
}

function createId(): string {
  return `life-area-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function useLifeAreas() {
  const [lifeAreas, setLifeAreas] = useState<LifeArea[]>(() => loadInitialLifeAreas())

  useEffect(() => {
    writeJSON(STORAGE_KEY, lifeAreas)
  }, [lifeAreas])

  function addLifeArea(input: LifeAreaInput) {
    const now = new Date().toISOString()
    const lifeArea: LifeArea = {
      ...input,
      id: createId(),
      createdAt: now,
      updatedAt: now,
    }
    setLifeAreas((prev) => [...prev, lifeArea])
  }

  function updateLifeArea(id: string, input: LifeAreaInput) {
    setLifeAreas((prev) =>
      prev.map((la) => (la.id === id ? { ...la, ...input, updatedAt: new Date().toISOString() } : la)),
    )
  }

  function deleteLifeArea(id: string) {
    setLifeAreas((prev) => prev.filter((la) => la.id !== id))
  }

  // Sprint 12: ใช้ตอน pull+merge จาก Firestore ตอน login เท่านั้น (last-write-wins by updatedAt)
  function mergeFromRemote(merged: LifeArea[]) {
    setLifeAreas(merged.map(normalizeLifeArea))
  }

  return { lifeAreas, addLifeArea, updateLifeArea, deleteLifeArea, mergeFromRemote }
}
