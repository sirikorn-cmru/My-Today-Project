import { useEffect, useState } from 'react'
import type { Task, TaskInput } from '../types'
import { readJSON, writeJSON } from '../lib/storage'
import { createSeedTasks } from '../data/seedTasks'

// v2: Sprint 7 replaced Task.subject (free text) with Task.lifeAreaId (Life Area reference).
// Bumping the key forces a clean reseed instead of writing migration logic, per the spec's
// own guidance — there was no real user data to preserve yet.
const STORAGE_KEY = 'my-today:tasks:v2'

// Sprint 10 เพิ่ม linkedNoteIds/linkedLinkIds/reminderLeadTime เป็นฟิลด์ใหม่บน Task — record เดิม
// ที่เคยเก็บไว้ก่อน Sprint นี้จะไม่มีสามฟิลด์นี้เลย (undefined) จึงต้อง normalize ตอนอ่านเพื่อกัน
// .includes()/.map() บนค่า undefined พัง ไม่ต้อง bump storage key เพราะเป็นฟิลด์เพิ่มล้วนๆ
function normalizeTask(task: Task): Task {
  return {
    ...task,
    linkedNoteIds: task.linkedNoteIds ?? [],
    linkedLinkIds: task.linkedLinkIds ?? [],
    reminderLeadTime: task.reminderLeadTime ?? null,
    // Sprint 12: record เดิมก่อน Sprint นี้ไม่มี updatedAt — ใช้ createdAt แทนเป็นค่าเริ่มต้น
    updatedAt: task.updatedAt ?? task.createdAt,
  }
}

function loadInitialTasks(): Task[] {
  const stored = readJSON<Task[] | null>(STORAGE_KEY, null)
  if (stored) return stored.map(normalizeTask)
  const seeded = createSeedTasks()
  writeJSON(STORAGE_KEY, seeded)
  return seeded
}

function createId(): string {
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadInitialTasks())

  useEffect(() => {
    writeJSON(STORAGE_KEY, tasks)
  }, [tasks])

  function addTask(input: TaskInput) {
    const now = new Date().toISOString()
    const task: Task = {
      ...input,
      id: createId(),
      createdAt: now,
      updatedAt: now,
    }
    setTasks((prev) => [task, ...prev])
  }

  function updateTask(id: string, input: TaskInput) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...input, updatedAt: new Date().toISOString() } : task)),
    )
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  function setStatus(id: string, status: Task['status']) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status, updatedAt: new Date().toISOString() } : task)),
    )
  }

  // Sprint 12: ใช้ตอน pull+merge จาก Firestore ตอน login เท่านั้น (last-write-wins by updatedAt)
  function mergeFromRemote(merged: Task[]) {
    setTasks(merged.map(normalizeTask))
  }

  return { tasks, addTask, updateTask, deleteTask, setStatus, mergeFromRemote }
}
