import { useEffect, useState } from 'react'
import type { Note, NoteInput } from '../types'
import { readJSON, writeJSON } from '../lib/storage'

const STORAGE_KEY = 'my-today:notes'

// Sprint 12: record เดิมก่อน Sprint นี้ไม่มี updatedAt — ใช้ createdAt แทนเป็นค่าเริ่มต้น
function normalizeNote(note: Note): Note {
  return { ...note, updatedAt: note.updatedAt ?? note.createdAt }
}

function createId(): string {
  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => readJSON<Note[]>(STORAGE_KEY, []).map(normalizeNote))

  useEffect(() => {
    writeJSON(STORAGE_KEY, notes)
  }, [notes])

  function addNote(input: NoteInput) {
    const now = new Date().toISOString()
    const note: Note = {
      ...input,
      id: createId(),
      createdAt: now,
      updatedAt: now,
    }
    setNotes((prev) => [note, ...prev])
  }

  function updateNote(id: string, input: NoteInput) {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, ...input, updatedAt: new Date().toISOString() } : note)),
    )
  }

  function deleteNote(id: string) {
    setNotes((prev) => prev.filter((note) => note.id !== id))
  }

  // Sprint 12: ใช้ตอน pull+merge จาก Firestore ตอน login เท่านั้น (last-write-wins by updatedAt)
  function mergeFromRemote(merged: Note[]) {
    setNotes(merged.map(normalizeNote))
  }

  return { notes, addNote, updateNote, deleteNote, mergeFromRemote }
}
