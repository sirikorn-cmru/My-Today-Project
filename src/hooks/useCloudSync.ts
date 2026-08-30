import { useEffect, useRef, useState } from 'react'
import type { CalendarEvent, Link, LifeArea, Note, Profile, Task } from '../types'
import { readJSON, writeJSON } from '../lib/storage'
import { pullAndMerge, pullProfile, pushDiff, pushProfile } from '../lib/cloudSync'
import { useAuth } from './useAuth'

const SYNC_ENABLED_KEY = 'my-today:sync-enabled'
const PUSH_DEBOUNCE_MS = 800

export type SyncStatus = 'idle' | 'syncing' | 'success' | 'error'

interface CloudSyncEntities {
  tasks: Task[]
  events: CalendarEvent[]
  notes: Note[]
  links: Link[]
  lifeAreas: LifeArea[]
  profile: Profile
  mergeTasks: (merged: Task[]) => void
  mergeEvents: (merged: CalendarEvent[]) => void
  mergeNotes: (merged: Note[]) => void
  mergeLinks: (merged: Link[]) => void
  mergeLifeAreas: (merged: LifeArea[]) => void
  mergeProfile: (remote: Profile | null) => void
}

// Sprint 12 (Version 3): orchestrates the whole Cloud Sync layer — Google Sign-In
// (via useAuth), the opt-in toggle (Business Rule 2), the one-time pull+merge on
// login (Scope: "pull ข้อมูลจาก cloud ตอน login บนอุปกรณ์ใหม่"), and a debounced
// background push per entity whenever its local array changes (Business Rule 1:
// local-first — the local write already happened before this hook ever runs).
export function useCloudSync(entities: CloudSyncEntities) {
  const auth = useAuth()
  const { user } = auth

  const [syncEnabled, setSyncEnabledState] = useState<boolean>(() => readJSON(SYNC_ENABLED_KEY, false))
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle')
  const [syncError, setSyncError] = useState<string | null>(null)
  const hasPulledRef = useRef(false)

  useEffect(() => {
    writeJSON(SYNC_ENABLED_KEY, syncEnabled)
  }, [syncEnabled])

  // สัญญาณให้ pull ใหม่รอบถัดไปถ้า user เปลี่ยน (เช่น sign out แล้ว sign in ใหม่)
  useEffect(() => {
    hasPulledRef.current = false
  }, [user?.uid])

  function setSyncEnabled(next: boolean) {
    setSyncEnabledState(next)
    if (!next) {
      setSyncStatus('idle')
      setSyncError(null)
    }
  }

  function clearSyncError() {
    setSyncError(null)
  }

  // Pull + merge ครั้งเดียวตอน sync เพิ่งเปิด (หรือ login ใหม่ขณะเปิด sync อยู่แล้ว)
  useEffect(() => {
    if (!user || !syncEnabled || hasPulledRef.current) return
    hasPulledRef.current = true
    let cancelled = false

    async function pullOnce() {
      if (!user) return
      setSyncStatus('syncing')
      try {
        const [mergedTasks, mergedEvents, mergedNotes, mergedLinks, mergedLifeAreas, remoteProfile] =
          await Promise.all([
            pullAndMerge(user.uid, 'tasks', entities.tasks),
            pullAndMerge(user.uid, 'events', entities.events),
            pullAndMerge(user.uid, 'notes', entities.notes),
            pullAndMerge(user.uid, 'links', entities.links),
            pullAndMerge(user.uid, 'lifeAreas', entities.lifeAreas),
            pullProfile<Profile>(user.uid),
          ])
        if (cancelled) return
        entities.mergeTasks(mergedTasks)
        entities.mergeEvents(mergedEvents)
        entities.mergeNotes(mergedNotes)
        entities.mergeLinks(mergedLinks)
        entities.mergeLifeAreas(mergedLifeAreas)
        entities.mergeProfile(remoteProfile)
        setSyncStatus('success')
        setSyncError(null)
      } catch (err) {
        if (cancelled) return
        setSyncStatus('error')
        setSyncError(err instanceof Error ? err.message : 'ดึงข้อมูลจาก Cloud ไม่สำเร็จ')
      }
    }

    pullOnce()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, syncEnabled])

  // Business Rule 1: local write เกิดไปแล้วก่อนหน้านี้เสมอ — ตรงนี้แค่ debounce แล้ว
  // reconcile ฝั่ง Firestore แบบ background/best-effort เท่านั้น ไม่ block ผู้ใช้
  function usePushCollection<T extends { id: string; updatedAt: string }>(
    collectionName: string,
    items: T[],
  ) {
    useEffect(() => {
      if (!user || !syncEnabled) return
      const timer = setTimeout(() => {
        setSyncStatus('syncing')
        pushDiff(user.uid, collectionName, items)
          .then(() => {
            setSyncStatus('success')
            setSyncError(null)
          })
          .catch((err) => {
            setSyncStatus('error')
            setSyncError(err instanceof Error ? err.message : 'ส่งข้อมูลขึ้น Cloud ไม่สำเร็จ')
          })
      }, PUSH_DEBOUNCE_MS)
      return () => clearTimeout(timer)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, user, syncEnabled])
  }

  usePushCollection('tasks', entities.tasks)
  usePushCollection('events', entities.events)
  usePushCollection('notes', entities.notes)
  usePushCollection('links', entities.links)
  usePushCollection('lifeAreas', entities.lifeAreas)

  useEffect(() => {
    if (!user || !syncEnabled) return
    const timer = setTimeout(() => {
      setSyncStatus('syncing')
      pushProfile(user.uid, entities.profile)
        .then(() => {
          setSyncStatus('success')
          setSyncError(null)
        })
        .catch((err) => {
          setSyncStatus('error')
          setSyncError(err instanceof Error ? err.message : 'ส่งข้อมูลขึ้น Cloud ไม่สำเร็จ')
        })
    }, PUSH_DEBOUNCE_MS)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entities.profile, user, syncEnabled])

  return {
    ...auth,
    syncEnabled,
    setSyncEnabled,
    syncStatus,
    syncError,
    clearSyncError,
  }
}
