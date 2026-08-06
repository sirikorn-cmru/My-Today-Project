import type { ScheduleItem, Task, UpcomingTask } from '../types'

export const mockTasks: Task[] = [
  {
    id: 't1',
    title: 'ส่งรายงาน STEM',
    subject: 'STEM 101',
    deadlineTime: '23:59',
    priority: 'High',
    status: 'To Do',
  },
  {
    id: 't2',
    title: 'ทำแบบฝึกหัด HCI บทที่ 4',
    subject: 'Human-Centered Design',
    deadlineTime: '17:00',
    priority: 'Medium',
    status: 'Doing',
  },
  {
    id: 't3',
    title: 'เตรียมสไลด์นำเสนอกลุ่ม',
    subject: 'Project Management',
    deadlineTime: '13:00',
    priority: 'Medium',
    status: 'Done',
  },
  {
    id: 't4',
    title: 'อ่านเปเปอร์เพิ่มเติม',
    subject: 'Research Methodology',
    deadlineTime: '20:00',
    priority: 'Low',
    status: 'To Do',
  },
]

export const mockSchedule: ScheduleItem[] = [
  { id: 's1', time: '09:00', title: 'เรียน HCI', location: 'ห้อง A301' },
  { id: 's2', time: '13:00', title: 'ประชุมกลุ่มโปรเจกต์', location: 'ห้องสมุดชั้น 3' },
  { id: 's3', time: '15:30', title: 'พบอาจารย์ที่ปรึกษา', location: 'ห้องพักอาจารย์ 214' },
]

export const mockUpcoming: UpcomingTask[] = [
  { id: 'u1', title: 'ส่งการบ้าน Database', subject: 'Database Systems', dueLabel: 'พรุ่งนี้ 12:00' },
  { id: 'u2', title: 'สอบย่อยวิชา Networking', subject: 'Computer Networking', dueLabel: 'อีก 2 วัน' },
  { id: 'u3', title: 'ส่ง Draft โปรเจกต์จบ', subject: 'Senior Project', dueLabel: 'อีก 3 วัน' },
]
