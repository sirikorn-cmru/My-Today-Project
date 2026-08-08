import { useEffect, useState } from 'react'
import { Footer } from '../components/Footer'
import type { Profile } from '../types'

interface ProfilePageProps {
  profile: Profile
  updateProfile: (profile: Profile) => void
}

export function ProfilePage({ profile, updateProfile }: ProfilePageProps) {
  const [form, setForm] = useState<Profile>(profile)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setForm(profile)
  }, [profile])

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0]
    if (!picked) return
    const reader = new FileReader()
    reader.onload = () => {
      setForm((f) => ({ ...f, profileImage: String(reader.result) }))
    }
    reader.readAsDataURL(picked)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    updateProfile(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <header className="bg-blue-600 px-4 py-6 text-white sm:px-6">
        <h1 className="text-xl font-semibold">ข้อมูลส่วนตัว (Personal Profile)</h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4 px-4 py-4 sm:px-6">
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center gap-3">
            {form.profileImage ? (
              <img src={form.profileImage} alt="Profile" className="h-16 w-16 rounded-full object-cover" />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">👤</div>
            )}
            <div>
              <label className="text-xs font-medium text-slate-500">รูปโปรไฟล์ (ไม่บังคับ)</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 text-xs text-slate-600" />
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-500">ชื่อ *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="ชื่อของคุณ"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">ชื่อที่อยากให้เรียก (Preferred Name)</label>
              <input
                value={form.preferredName}
                onChange={(e) => setForm((f) => ({ ...f, preferredName: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">อีเมล</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-sm font-semibold text-slate-900">ข้อมูลเสริม (ไม่บังคับ)</h2>
          <p className="mt-1 text-xs text-slate-500">
            กรอกเฉพาะส่วนที่เกี่ยวข้องกับคุณ — สำหรับนักศึกษาใช้ Student ID/Faculty/Major, สำหรับพนักงานใช้
            Organization/Position ไม่ต้องกรอกทั้งหมด
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Student ID</label>
              <input
                value={form.studentId}
                onChange={(e) => setForm((f) => ({ ...f, studentId: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Faculty</label>
              <input
                value={form.faculty}
                onChange={(e) => setForm((f) => ({ ...f, faculty: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Major</label>
              <input
                value={form.major}
                onChange={(e) => setForm((f) => ({ ...f, major: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Organization</label>
              <input
                value={form.organization}
                onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
              />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-medium text-slate-500">Position</label>
              <input
                value={form.position}
                onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white">
          {saved ? 'บันทึกแล้ว ✓' : 'บันทึกข้อมูล'}
        </button>
      </form>
      <Footer />
    </div>
  )
}
