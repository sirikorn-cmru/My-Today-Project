import { useEffect, useState } from 'react'
import type { LifeArea, LifeAreaInput } from '../types'
import { readJSON, writeJSON } from '../lib/storage'
import { createSeedLifeAreas } from '../data/seedLifeAreas'

const STORAGE_KEY = 'my-today:life-areas'

function loadInitialLifeAreas(): LifeArea[] {
  const stored = readJSON<LifeArea[] | null>(STORAGE_KEY, null)
  if (stored) return stored
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
    const lifeArea: LifeArea = {
      ...input,
      id: createId(),
      createdAt: new Date().toISOString(),
    }
    setLifeAreas((prev) => [...prev, lifeArea])
  }

  function updateLifeArea(id: string, input: LifeAreaInput) {
    setLifeAreas((prev) => prev.map((la) => (la.id === id ? { ...la, ...input } : la)))
  }

  function deleteLifeArea(id: string) {
    setLifeAreas((prev) => prev.filter((la) => la.id !== id))
  }

  return { lifeAreas, addLifeArea, updateLifeArea, deleteLifeArea }
}
