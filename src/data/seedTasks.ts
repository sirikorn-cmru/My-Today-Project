import type { Task } from '../types'
import { todayISO } from '../lib/taskUtils'

function offsetDate(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return todayISO(d)
}

export function createSeedTasks(): Task[] {
  const now = new Date().toISOString()
  return [
    {
      id: 'seed-1',
      title: 'ส่งรายงาน STEM',
      description: 'สรุปผลการทดลองบทที่ 5 พร้อมภาคผนวก',
      subject: 'STEM 101',
      dueDate: offsetDate(0),
      dueTime: '23:59',
      priority: 'High',
      status: 'To Do',
      createdAt: now,
    },
    {
      id: 'seed-2',
      title: 'ทำแบบฝึกหัด HCI บทที่ 4',
      description: 'ออกแบบ wireframe ตาม user persona ที่กำหนด',
      subject: 'Human-Centered Design',
      dueDate: offsetDate(0),
      dueTime: '17:00',
      priority: 'Medium',
      status: 'Doing',
      createdAt: now,
    },
    {
      id: 'seed-3',
      title: 'เตรียมสไลด์นำเสนอกลุ่ม',
      description: 'สไลด์สรุปความคืบหน้าโปรเจกต์',
      subject: 'Project Management',
      dueDate: offsetDate(0),
      dueTime: '13:00',
      priority: 'Medium',
      status: 'Done',
      createdAt: now,
    },
    {
      id: 'seed-4',
      title: 'ส่งการบ้าน Database',
      description: 'ออกแบบ ER Diagram ของระบบร้านค้า',
      subject: 'Database Systems',
      dueDate: offsetDate(1),
      dueTime: '12:00',
      priority: 'Medium',
      status: 'To Do',
      createdAt: now,
    },
    {
      id: 'seed-5',
      title: 'สอบย่อยวิชา Networking',
      description: 'ทบทวนบทที่ 3-4 เรื่อง TCP/IP',
      subject: 'Computer Networking',
      dueDate: offsetDate(2),
      dueTime: '09:00',
      priority: 'High',
      status: 'To Do',
      createdAt: now,
    },
    {
      id: 'seed-6',
      title: 'ส่ง Draft โปรเจกต์จบ',
      description: 'ส่งบทที่ 1-3 ให้อาจารย์ที่ปรึกษาตรวจ',
      subject: 'Senior Project',
      dueDate: offsetDate(3),
      dueTime: '17:00',
      priority: 'Low',
      status: 'To Do',
      createdAt: now,
    },
  ]
}
