import type { ScheduleItem } from '../types'

// Schedule remains mock data until Sprint 3 (Calendar & Schedule) implements real storage.
export const mockSchedule: ScheduleItem[] = [
  { id: 's1', time: '09:00', title: 'เรียน HCI', location: 'ห้อง A301' },
  { id: 's2', time: '13:00', title: 'ประชุมกลุ่มโปรเจกต์', location: 'ห้องสมุดชั้น 3' },
  { id: 's3', time: '15:30', title: 'พบอาจารย์ที่ปรึกษา', location: 'ห้องพักอาจารย์ 214' },
]
