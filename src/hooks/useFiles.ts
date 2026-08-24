import { useEffect, useState } from 'react'
import type { FileRecord, FileRecordInput } from '../types'
import { deleteFileRecord, putFile, seedIfEmpty } from '../lib/fileDb'
import { createSeedFiles } from '../data/seedFiles'

function createId(): string {
  return `file-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function toErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  return 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ'
}

// Sprint 10 เพิ่ม linkedEventIds เป็นฟิลด์ใหม่บน FileRecord — record เดิมที่เคยเก็บไว้ก่อน Sprint
// นี้ใน IndexedDB จะไม่มีฟิลด์นี้เลย (undefined) จึงต้อง normalize ตอนอ่านเพื่อกัน .includes() พัง
function normalizeFile(file: FileRecord): FileRecord {
  return { ...file, linkedEventIds: file.linkedEventIds ?? [] }
}

export function useFiles() {
  const [files, setFiles] = useState<FileRecord[]>([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    seedIfEmpty(createSeedFiles)
      .then((records) => {
        setFiles(records.map(normalizeFile))
        setLoaded(true)
      })
      .catch((err) => {
        setError(`โหลดไฟล์ไม่สำเร็จ: ${toErrorMessage(err)} (เบราว์เซอร์นี้อาจไม่รองรับ IndexedDB หรืออยู่ในโหมดส่วนตัว)`)
        setLoaded(true)
      })
  }, [])

  async function addFile(input: FileRecordInput) {
    const record: FileRecord = {
      ...input,
      id: createId(),
      createdAt: new Date().toISOString(),
    }
    try {
      await putFile(record)
      setFiles((prev) => [record, ...prev])
    } catch (err) {
      setError(`เพิ่มไฟล์ไม่สำเร็จ: ${toErrorMessage(err)}`)
    }
  }

  async function deleteFile(id: string) {
    try {
      await deleteFileRecord(id)
      setFiles((prev) => prev.filter((file) => file.id !== id))
    } catch (err) {
      setError(`ลบไฟล์ไม่สำเร็จ: ${toErrorMessage(err)}`)
    }
  }

  async function linkFileToTask(fileId: string, taskId: string) {
    const file = files.find((f) => f.id === fileId)
    if (!file || file.linkedTaskIds.includes(taskId)) return
    const updated: FileRecord = { ...file, linkedTaskIds: [...file.linkedTaskIds, taskId] }
    try {
      await putFile(updated)
      setFiles((prev) => prev.map((f) => (f.id === fileId ? updated : f)))
    } catch (err) {
      setError(`เชื่อมไฟล์กับงานไม่สำเร็จ: ${toErrorMessage(err)}`)
    }
  }

  async function unlinkFileFromTask(fileId: string, taskId: string) {
    const file = files.find((f) => f.id === fileId)
    if (!file) return
    const updated: FileRecord = { ...file, linkedTaskIds: file.linkedTaskIds.filter((id) => id !== taskId) }
    try {
      await putFile(updated)
      setFiles((prev) => prev.map((f) => (f.id === fileId ? updated : f)))
    } catch (err) {
      setError(`ยกเลิกเชื่อมไฟล์ไม่สำเร็จ: ${toErrorMessage(err)}`)
    }
  }

  async function linkFileToEvent(fileId: string, eventId: string) {
    const file = files.find((f) => f.id === fileId)
    if (!file || file.linkedEventIds.includes(eventId)) return
    const updated: FileRecord = { ...file, linkedEventIds: [...file.linkedEventIds, eventId] }
    try {
      await putFile(updated)
      setFiles((prev) => prev.map((f) => (f.id === fileId ? updated : f)))
    } catch (err) {
      setError(`เชื่อมไฟล์กับกิจกรรมไม่สำเร็จ: ${toErrorMessage(err)}`)
    }
  }

  async function unlinkFileFromEvent(fileId: string, eventId: string) {
    const file = files.find((f) => f.id === fileId)
    if (!file) return
    const updated: FileRecord = { ...file, linkedEventIds: file.linkedEventIds.filter((id) => id !== eventId) }
    try {
      await putFile(updated)
      setFiles((prev) => prev.map((f) => (f.id === fileId ? updated : f)))
    } catch (err) {
      setError(`ยกเลิกเชื่อมไฟล์ไม่สำเร็จ: ${toErrorMessage(err)}`)
    }
  }

  async function updateFileLifeArea(fileId: string, lifeAreaId: string) {
    const file = files.find((f) => f.id === fileId)
    if (!file) return
    const updated: FileRecord = { ...file, lifeAreaId }
    try {
      await putFile(updated)
      setFiles((prev) => prev.map((f) => (f.id === fileId ? updated : f)))
    } catch (err) {
      setError(`อัปเดตไฟล์ไม่สำเร็จ: ${toErrorMessage(err)}`)
    }
  }

  async function updateFile(
    fileId: string,
    patch: Partial<Pick<FileRecord, 'name' | 'category' | 'lifeAreaId' | 'linkedTaskIds' | 'linkedEventIds' | 'inInbox'>>,
  ) {
    const file = files.find((f) => f.id === fileId)
    if (!file) return
    const updated: FileRecord = { ...file, ...patch }
    try {
      await putFile(updated)
      setFiles((prev) => prev.map((f) => (f.id === fileId ? updated : f)))
    } catch (err) {
      setError(`อัปเดตไฟล์ไม่สำเร็จ: ${toErrorMessage(err)}`)
    }
  }

  function clearError() {
    setError(null)
  }

  return {
    files,
    loaded,
    error,
    clearError,
    addFile,
    deleteFile,
    linkFileToTask,
    unlinkFileFromTask,
    linkFileToEvent,
    unlinkFileFromEvent,
    updateFileLifeArea,
    updateFile,
  }
}
