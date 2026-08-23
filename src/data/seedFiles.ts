import type { FileRecord } from '../types'

function textBlob(content: string): Blob {
  return new Blob([content], { type: 'text/plain' })
}

export function createSeedFiles(): FileRecord[] {
  const now = new Date().toISOString()
  return [
    {
      id: 'seed-f1',
      name: 'report.docx',
      category: 'เอกสาร',
      lifeAreaId: 'la-study',
      linkedTaskIds: ['seed-1'],
      mimeType: 'text/plain',
      size: 42,
      inInbox: false,
      createdAt: now,
      blob: textBlob('ตัวอย่างเนื้อหารายงาน STEM (ไฟล์ตัวอย่างสำหรับทดสอบระบบ)'),
    },
    {
      id: 'seed-f2',
      name: 'rubric.pdf',
      category: 'เอกสาร',
      lifeAreaId: 'la-study',
      linkedTaskIds: ['seed-1'],
      mimeType: 'text/plain',
      size: 30,
      inInbox: false,
      createdAt: now,
      blob: textBlob('เกณฑ์การให้คะแนนรายงาน STEM (ไฟล์ตัวอย่าง)'),
    },
    {
      id: 'seed-f3',
      name: 'reference.pdf',
      category: 'เอกสาร',
      lifeAreaId: 'la-study',
      linkedTaskIds: ['seed-1'],
      mimeType: 'text/plain',
      size: 25,
      inInbox: false,
      createdAt: now,
      blob: textBlob('เอกสารอ้างอิงประกอบรายงาน (ไฟล์ตัวอย่าง)'),
    },
    {
      id: 'seed-f4',
      name: 'ใบแจ้งหนี้ค่าไฟ.pdf',
      category: 'บิล/ใบแจ้งหนี้',
      lifeAreaId: 'la-finance',
      linkedTaskIds: ['seed-7'],
      mimeType: 'text/plain',
      size: 38,
      inInbox: false,
      createdAt: now,
      blob: textBlob('ตัวอย่างใบแจ้งหนี้ค่าไฟ (ไฟล์ตัวอย่างสำหรับทดสอบระบบ)'),
    },
  ]
}
