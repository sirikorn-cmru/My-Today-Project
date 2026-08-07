import { useEffect, useState } from 'react'
import type { FileRecord, FileRecordInput } from '../types'
import { deleteFileRecord, putFile, seedIfEmpty } from '../lib/fileDb'
import { createSeedFiles } from '../data/seedFiles'

function createId(): string {
  return `file-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function useFiles() {
  const [files, setFiles] = useState<FileRecord[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    seedIfEmpty(createSeedFiles).then((records) => {
      setFiles(records)
      setLoaded(true)
    })
  }, [])

  async function addFile(input: FileRecordInput) {
    const record: FileRecord = {
      ...input,
      id: createId(),
      createdAt: new Date().toISOString(),
    }
    await putFile(record)
    setFiles((prev) => [record, ...prev])
  }

  async function deleteFile(id: string) {
    await deleteFileRecord(id)
    setFiles((prev) => prev.filter((file) => file.id !== id))
  }

  async function linkFileToTask(fileId: string, taskId: string) {
    const file = files.find((f) => f.id === fileId)
    if (!file || file.linkedTaskIds.includes(taskId)) return
    const updated: FileRecord = { ...file, linkedTaskIds: [...file.linkedTaskIds, taskId] }
    await putFile(updated)
    setFiles((prev) => prev.map((f) => (f.id === fileId ? updated : f)))
  }

  async function unlinkFileFromTask(fileId: string, taskId: string) {
    const file = files.find((f) => f.id === fileId)
    if (!file) return
    const updated: FileRecord = { ...file, linkedTaskIds: file.linkedTaskIds.filter((id) => id !== taskId) }
    await putFile(updated)
    setFiles((prev) => prev.map((f) => (f.id === fileId ? updated : f)))
  }

  return { files, loaded, addFile, deleteFile, linkFileToTask, unlinkFileFromTask }
}
