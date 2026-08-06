import { useEffect, useState } from 'react'
import type { Task, TaskInput } from '../types'
import { readJSON, writeJSON } from '../lib/storage'
import { createSeedTasks } from '../data/seedTasks'

const STORAGE_KEY = 'my-today:tasks'

function loadInitialTasks(): Task[] {
  const stored = readJSON<Task[] | null>(STORAGE_KEY, null)
  if (stored) return stored
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
    const task: Task = {
      ...input,
      id: createId(),
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [task, ...prev])
  }

  function updateTask(id: string, input: TaskInput) {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...input } : task)))
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  function setStatus(id: string, status: Task['status']) {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, status } : task)))
  }

  return { tasks, addTask, updateTask, deleteTask, setStatus }
}
