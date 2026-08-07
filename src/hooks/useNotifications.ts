import { useEffect, useMemo, useState } from 'react'
import type { CalendarEvent, Task } from '../types'
import { readJSON, writeJSON } from '../lib/storage'
import { buildNotifications } from '../lib/notificationUtils'

const READ_KEY = 'my-today:notifications-read'
const NOTIFIED_KEY = 'my-today:notifications-notified'

export function useNotifications(tasks: Task[], events: CalendarEvent[]) {
  const [readIds, setReadIds] = useState<string[]>(() => readJSON<string[]>(READ_KEY, []))
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>(
    typeof Notification === 'undefined' ? 'unsupported' : Notification.permission,
  )

  const notifications = useMemo(
    () => buildNotifications(tasks, events, new Set(readIds)),
    [tasks, events, readIds],
  )
  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    writeJSON(READ_KEY, readIds)
  }, [readIds])

  // Progressive enhancement: fire a native Browser Notification for newly-appeared
  // Overdue/DueToday items, only if the user already granted permission. The in-app
  // Notification Center above is the real feature and works regardless of this.
  useEffect(() => {
    if (permission !== 'granted') return
    const notifiedIds = readJSON<string[]>(NOTIFIED_KEY, [])
    const notifiedSet = new Set(notifiedIds)
    const toNotify = notifications.filter((n) => n.level !== 'DueSoon' && !notifiedSet.has(n.id))
    if (toNotify.length === 0) return
    toNotify.forEach((n) => {
      new Notification('My Today', { body: n.message })
      notifiedSet.add(n.id)
    })
    writeJSON(NOTIFIED_KEY, [...notifiedSet])
  }, [notifications, permission])

  function markRead(id: string) {
    setReadIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  function markAllRead() {
    setReadIds(notifications.map((n) => n.id))
  }

  async function requestPermission() {
    if (typeof Notification === 'undefined') return
    const result = await Notification.requestPermission()
    setPermission(result)
  }

  return { notifications, unreadCount, markRead, markAllRead, permission, requestPermission }
}
