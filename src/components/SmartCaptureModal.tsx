import { useState } from 'react'
import type { User } from 'firebase/auth'
import type { CalendarEventInput } from '../types'
import { primaryButtonClass, secondaryButtonClass } from '../lib/uiClasses'
import { ModalShell } from './ModalShell'

interface SmartCaptureModalProps {
  open: boolean
  user: User | null
  onClose: () => void
  // ส่งค่าที่สกัดได้ (บางส่วนหรือว่างเปล่า) กลับไปให้ผู้ปกครองเปิด EventFormModal ต่อ
  // เพื่อให้ผู้ใช้ตรวจสอบ/แก้ไขก่อนบันทึกเสมอ — ไม่มีการบันทึก Event จริงจากที่นี่โดยตรง
  onExtracted: (fields: Partial<CalendarEventInput>) => void
  // ผู้ใช้เลือก "กรอกฟอร์มเอง" แทน หรือกด fallback หลัง error
  onManualFallback: () => void
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result)
      // ตัด prefix "data:<mime>;base64," ออก เหลือแค่ payload base64 ล้วนๆ
      resolve(result.slice(result.indexOf(',') + 1))
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

// Sprint 13: Smart Capture จากรูปภาพ — เฉพาะ Quick Capture ประเภท Event เท่านั้น
// ต้อง sign in ก่อนใช้งาน (Business Rule 3) รูปภาพส่งไปยัง Vercel Serverless Function
// เป็นตัวกลาง (ไม่เก็บ API key ฝั่ง client) แล้วส่งกลับมาแค่ผลลัพธ์ที่สกัดได้ ไม่ persist รูปที่ไหนเลย
export function SmartCaptureModal({ open, user, onClose, onExtracted, onManualFallback }: SmartCaptureModalProps) {
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  if (!open) return null

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !user) return
    setStatus('analyzing')
    setError(null)
    try {
      const [imageBase64, idToken] = await Promise.all([fileToBase64(file), user.getIdToken()])
      const res = await fetch('/api/smart-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, imageBase64, mimeType: file.type }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus('error')
        setError(data?.error ?? 'วิเคราะห์รูปภาพไม่สำเร็จ')
        return
      }
      const prefill: Partial<CalendarEventInput> = {}
      if (data.title) prefill.title = data.title
      if (data.date) prefill.date = data.date
      if (data.startTime) prefill.startTime = data.startTime
      if (data.location) prefill.location = data.location
      onExtracted(prefill)
    } catch {
      setStatus('error')
      setError('เชื่อมต่อไม่สำเร็จ ตรวจสอบอินเทอร์เน็ตแล้วลองใหม่')
    }
  }

  return (
    <ModalShell titleId="smart-capture-title" onClose={onClose}>
      <h3 id="smart-capture-title" className="text-lg font-semibold text-slate-900">
        สแกนจากรูปภาพ — กิจกรรม
      </h3>

      {!user ? (
        <div className="mt-4 space-y-3">
          <p className="text-sm text-slate-600">
            ฟีเจอร์นี้ต้อง sign in ด้วย Google ก่อนใช้งาน (Quick Capture ประเภทอื่นยังใช้ได้โดยไม่ต้อง sign in ตามปกติ)
          </p>
          <button type="button" onClick={onManualFallback} className={`w-full ${secondaryButtonClass}`}>
            กรอกฟอร์มเองแทน
          </button>
          <button type="button" onClick={onClose} className={`w-full ${primaryButtonClass}`}>
            ปิด
          </button>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          <p className="text-xs text-slate-500">
            เลือกรูปภาพ (เช่น โปสเตอร์งาน/บัตรเชิญ) ให้ AI ช่วยอ่านชื่องาน/วันที่/เวลา/สถานที่มาเติมฟอร์มให้ — ตรวจสอบ/แก้ไขได้ก่อนบันทึกเสมอ
            รูปภาพไม่ถูกเก็บไว้ที่ไหนถาวร
          </p>

          {status === 'analyzing' && (
            <p className="flex items-center gap-2 text-sm text-slate-600">
              <span
                aria-hidden
                className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600"
              />
              กำลังวิเคราะห์รูปภาพ...
            </p>
          )}

          {status === 'error' && error && (
            <div role="alert" className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700 ring-1 ring-rose-200">
              {error}
            </div>
          )}

          <label
            htmlFor="smart-capture-file"
            className={`block cursor-pointer text-center ${primaryButtonClass} ${
              status === 'analyzing' ? 'pointer-events-none opacity-40' : ''
            }`}
          >
            เลือกรูปภาพ
          </label>
          <input
            id="smart-capture-file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={status === 'analyzing'}
            className="sr-only"
          />

          <button type="button" onClick={onManualFallback} className={`w-full ${secondaryButtonClass}`}>
            กรอกฟอร์มเองแทน
          </button>
          <button type="button" onClick={onClose} className="w-full text-center text-xs text-slate-500 underline">
            ยกเลิก
          </button>
        </div>
      )}
    </ModalShell>
  )
}
