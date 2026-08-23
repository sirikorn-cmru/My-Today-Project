import { useEffect, useState } from 'react'
import type { Note, NoteInput } from '../types'
import { readJSON, writeJSON } from '../lib/storage'

const STORAGE_KEY = 'my-today:notes'

function createId(): string {
  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => readJSON<Note[]>(STORAGE_KEY, []))

  useEffect(() => {
    writeJSON(STORAGE_KEY, notes)
  }, [notes])

  function addNote(input: NoteInput) {
    const note: Note = {
      ...input,
      id: createId(),
      createdAt: new Date().toISOString(),
    }
    setNotes((prev) => [note, ...prev])
  }

  function updateNote(id: string, input: NoteInput) {
    setNotes((prev) => prev.map((note) => (note.id === id ? { ...note, ...input } : note)))
  }

  function deleteNote(id: string) {
    setNotes((prev) => prev.filter((note) => note.id !== id))
  }

  return { notes, addNote, updateNote, deleteNote }
}
