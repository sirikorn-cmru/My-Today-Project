import { useEffect, useState } from 'react'
import type { CalendarEvent, CalendarEventInput } from '../types'
import { readJSON, writeJSON } from '../lib/storage'
import { createSeedEvents } from '../data/seedEvents'

const STORAGE_KEY = 'my-today:events'

function loadInitialEvents(): CalendarEvent[] {
  const stored = readJSON<CalendarEvent[] | null>(STORAGE_KEY, null)
  if (stored) return stored
  const seeded = createSeedEvents()
  writeJSON(STORAGE_KEY, seeded)
  return seeded
}

function createId(): string {
  return `event-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function useEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>(() => loadInitialEvents())

  useEffect(() => {
    writeJSON(STORAGE_KEY, events)
  }, [events])

  function addEvent(input: CalendarEventInput) {
    const event: CalendarEvent = {
      ...input,
      id: createId(),
      createdAt: new Date().toISOString(),
    }
    setEvents((prev) => [event, ...prev])
  }

  function updateEvent(id: string, input: CalendarEventInput) {
    setEvents((prev) => prev.map((event) => (event.id === id ? { ...event, ...input } : event)))
  }

  function deleteEvent(id: string) {
    setEvents((prev) => prev.filter((event) => event.id !== id))
  }

  return { events, addEvent, updateEvent, deleteEvent }
}
