import type { CalendarEvent } from '../types'
import { todayISO } from '../lib/taskUtils'

function offsetDate(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return todayISO(d)
}

export function createSeedEvents(): CalendarEvent[] {
  const now = new Date().toISOString()
  return [
    {
      id: 'seed-e1',
      title: 'เรียน HCI',
      type: 'เรียน',
      date: offsetDate(0),
      startTime: '09:00',
      endTime: '10:30',
      location: 'ห้อง A301',
      description: '',
      lifeAreaId: 'la-study',
      inInbox: false,
      createdAt: now,
    },
    {
      id: 'seed-e2',
      title: 'ประชุมกลุ่มโปรเจกต์',
      type: 'ประชุม',
      date: offsetDate(0),
      startTime: '13:00',
      endTime: '14:00',
      location: 'ห้องสมุดชั้น 3',
      description: '',
      lifeAreaId: 'la-work',
      inInbox: false,
      createdAt: now,
    },
    {
      id: 'seed-e3',
      title: 'พบอาจารย์ที่ปรึกษา',
      type: 'นัดหมาย',
      date: offsetDate(0),
      startTime: '15:30',
      endTime: '16:00',
      location: 'ห้องพักอาจารย์ 214',
      description: '',
      lifeAreaId: 'la-study',
      inInbox: false,
      createdAt: now,
    },
    {
      id: 'seed-e4',
      title: 'นัดหมอฟัน',
      type: 'นัดหมาย',
      date: offsetDate(2),
      startTime: '10:00',
      endTime: '11:00',
      location: 'คลินิกทันตกรรมใกล้บ้าน',
      description: '',
      lifeAreaId: 'la-health',
      inInbox: false,
      createdAt: now,
    },
    {
      id: 'seed-e5',
      title: 'เรียน HCI',
      type: 'เรียน',
      date: offsetDate(7),
      startTime: '09:00',
      endTime: '10:30',
      location: 'ห้อง A301',
      description: '',
      lifeAreaId: 'la-study',
      inInbox: false,
      createdAt: now,
    },
  ]
}
