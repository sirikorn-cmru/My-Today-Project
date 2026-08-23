import type { LifeArea } from '../types'

export function createSeedLifeAreas(): LifeArea[] {
  const now = new Date().toISOString()
  return [
    { id: 'la-work', name: 'Work', createdAt: now },
    { id: 'la-study', name: 'Study', createdAt: now },
    { id: 'la-finance', name: 'Finance', createdAt: now },
    { id: 'la-health', name: 'Health', createdAt: now },
    { id: 'la-personal', name: 'Personal', createdAt: now },
  ]
}
