import { useEffect, useState } from 'react'
import type { CalendarEvent, CalendarEventInput } from '../types'
import { readJSON, writeJSON } from '../lib/storage'
import { createSeedEvents } from '../data/seedEvents'

const STORAGE_KEY = 'my-today:events'

// Sprint 10 เพิ่ม linkedNoteIds/linkedLinkIds/reminderLeadTime เป็นฟิลด์ใหม่บน Event — record เดิม
// ที่เคยเก็บไว้ก่อน Sprint นี้จะไม่มีสามฟิลด์นี้เลย (undefined) จึงต้อง normalize ตอนอ่านเพื่อกัน
// .includes()/.map() บนค่า undefined พัง ไม่ต้อง bump storage key เพราะเป็นฟิลด์เพิ่มล้วนๆ
function normalizeEvent(event: CalendarEvent): CalendarEvent {
  return {
    ...event,
    linkedNoteIds: event.linkedNoteIds ?? [],
    linkedLinkIds: event.linkedLinkIds ?? [],
    reminderLeadTime: event.reminderLeadTime ?? null,
    // Sprint 12: record เดิมก่อน Sprint นี้ไม่มี updatedAt — ใช้ createdAt แทนเป็นค่าเริ่มต้น
    updatedAt: event.updatedAt ?? event.createdAt,
  }
}

function loadInitialEvents(): CalendarEvent[] {
  const stored = readJSON<CalendarEvent[] | null>(STORAGE_KEY, null)
  if (stored) return stored.map(normalizeEvent)
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
    const now = new Date().toISOString()
    const event: CalendarEvent = {
      ...input,
      id: createId(),
      createdAt: now,
      updatedAt: now,
    }
    setEvents((prev) => [event, ...prev])
  }

  function updateEvent(id: string, input: CalendarEventInput) {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, ...input, updatedAt: new Date().toISOString() } : event)),
    )
  }

  function deleteEvent(id: string) {
    setEvents((prev) => prev.filter((event) => event.id !== id))
  }

  // Sprint 12: ใช้ตอน pull+merge จาก Firestore ตอน login เท่านั้น (last-write-wins by updatedAt)
  function mergeFromRemote(merged: CalendarEvent[]) {
    setEvents(merged.map(normalizeEvent))
  }

  return { events, addEvent, updateEvent, deleteEvent, mergeFromRemote }
}
