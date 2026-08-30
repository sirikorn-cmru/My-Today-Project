import { useEffect, useState } from 'react'
import type { Link, LinkInput } from '../types'
import { readJSON, writeJSON } from '../lib/storage'

const STORAGE_KEY = 'my-today:links'

// Sprint 12: record เดิมก่อน Sprint นี้ไม่มี updatedAt — ใช้ createdAt แทนเป็นค่าเริ่มต้น
function normalizeLink(link: Link): Link {
  return { ...link, updatedAt: link.updatedAt ?? link.createdAt }
}

function createId(): string {
  return `link-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function useLinks() {
  const [links, setLinks] = useState<Link[]>(() => readJSON<Link[]>(STORAGE_KEY, []).map(normalizeLink))

  useEffect(() => {
    writeJSON(STORAGE_KEY, links)
  }, [links])

  function addLink(input: LinkInput) {
    const now = new Date().toISOString()
    const link: Link = {
      ...input,
      id: createId(),
      createdAt: now,
      updatedAt: now,
    }
    setLinks((prev) => [link, ...prev])
  }

  function updateLink(id: string, input: LinkInput) {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, ...input, updatedAt: new Date().toISOString() } : link)),
    )
  }

  function deleteLink(id: string) {
    setLinks((prev) => prev.filter((link) => link.id !== id))
  }

  // Sprint 12: ใช้ตอน pull+merge จาก Firestore ตอน login เท่านั้น (last-write-wins by updatedAt)
  function mergeFromRemote(merged: Link[]) {
    setLinks(merged.map(normalizeLink))
  }

  return { links, addLink, updateLink, deleteLink, mergeFromRemote }
}
