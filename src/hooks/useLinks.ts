import { useEffect, useState } from 'react'
import type { Link, LinkInput } from '../types'
import { readJSON, writeJSON } from '../lib/storage'

const STORAGE_KEY = 'my-today:links'

function createId(): string {
  return `link-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function useLinks() {
  const [links, setLinks] = useState<Link[]>(() => readJSON<Link[]>(STORAGE_KEY, []))

  useEffect(() => {
    writeJSON(STORAGE_KEY, links)
  }, [links])

  function addLink(input: LinkInput) {
    const link: Link = {
      ...input,
      id: createId(),
      createdAt: new Date().toISOString(),
    }
    setLinks((prev) => [link, ...prev])
  }

  function updateLink(id: string, input: LinkInput) {
    setLinks((prev) => prev.map((link) => (link.id === id ? { ...link, ...input } : link)))
  }

  function deleteLink(id: string) {
    setLinks((prev) => prev.filter((link) => link.id !== id))
  }

  return { links, addLink, updateLink, deleteLink }
}
