import type { LifeArea } from '../types'

export function createSeedLifeAreas(): LifeArea[] {
  const now = new Date().toISOString()
  return [
    { id: 'la-work', name: 'Work', createdAt: now, updatedAt: now },
    { id: 'la-study', name: 'Study', createdAt: now, updatedAt: now },
    { id: 'la-finance', name: 'Finance', createdAt: now, updatedAt: now },
    { id: 'la-health', name: 'Health', createdAt: now, updatedAt: now },
    { id: 'la-personal', name: 'Personal', createdAt: now, updatedAt: now },
  ]
}
