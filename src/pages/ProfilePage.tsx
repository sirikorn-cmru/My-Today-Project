import { useEffect, useState } from 'react'
import { Footer } from '../components/Footer'
import { cardClass, inputClass, pageHeaderClass, primaryButtonClass } from '../lib/uiClasses'
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
      <header className={pageHeaderClass}>
        <h1 className="text-xl font-semibold">ข้อมูลส่วนตัว (Personal Profile)</h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4 px-4 py-4 sm:px-6">
        <div className={cardClass}>
          <div className="flex items-center gap-3">
            {form.profileImage ? (
              <img src={form.profileImage} alt="Profile" className="h-16 w-16 rounded-full object-cover" />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">👤</div>
            )}
            <div>
              <label htmlFor="profile-image" className="text-xs font-medium text-slate-500">
                รูปโปรไฟล์ (ไม่บังคับ)
              </label>
              <input
                id="profile-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 rounded text-xs text-slate-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <label htmlFor="profile-name" className="text-xs font-medium text-slate-500">
                ชื่อ *
              </label>
              <input
                id="profile-name"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="ชื่อของคุณ"
                className={`mt-1 ${inputClass}`}
              />
            </div>
            <div>
              <label htmlFor="profile-preferred-name" className="text-xs font-medium text-slate-500">
                ชื่อที่อยากให้เรียก (Preferred Name)
              </label>
              <input
                id="profile-preferred-name"
                value={form.preferredName}
                onChange={(e) => setForm((f) => ({ ...f, preferredName: e.target.value }))}
                className={`mt-1 ${inputClass}`}
              />
            </div>
            <div>
              <label htmlFor="profile-email" className="text-xs font-medium text-slate-500">
                อีเมล
              </label>
              <input
                id="profile-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={`mt-1 ${inputClass}`}
              />
            </div>
          </div>
        </div>

        <div className={cardClass}>
          <h2 className="text-sm font-semibold text-slate-900">ข้อมูลเสริม (ไม่บังคับ)</h2>
          <p className="mt-1 text-xs text-slate-500">
            กรอกเฉพาะส่วนที่เกี่ยวข้องกับคุณ — สำหรับนักศึกษาใช้ Student ID/Faculty/Major, สำหรับพนักงานใช้
            Organization/Position ไม่ต้องกรอกทั้งหมด
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="profile-student-id" className="text-xs font-medium text-slate-500">
                Student ID
              </label>
              <input
                id="profile-student-id"
                value={form.studentId}
                onChange={(e) => setForm((f) => ({ ...f, studentId: e.target.value }))}
                className={`mt-1 ${inputClass}`}
              />
            </div>
            <div>
              <label htmlFor="profile-faculty" className="text-xs font-medium text-slate-500">
                Faculty
              </label>
              <input
                id="profile-faculty"
                value={form.faculty}
                onChange={(e) => setForm((f) => ({ ...f, faculty: e.target.value }))}
                className={`mt-1 ${inputClass}`}
              />
            </div>
            <div>
              <label htmlFor="profile-major" className="text-xs font-medium text-slate-500">
                Major
              </label>
              <input
                id="profile-major"
                value={form.major}
                onChange={(e) => setForm((f) => ({ ...f, major: e.target.value }))}
                className={`mt-1 ${inputClass}`}
              />
            </div>
            <div>
              <label htmlFor="profile-organization" className="text-xs font-medium text-slate-500">
                Organization
              </label>
              <input
                id="profile-organization"
                value={form.organization}
                onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))}
                className={`mt-1 ${inputClass}`}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="profile-position" className="text-xs font-medium text-slate-500">
                Position
              </label>
              <input
                id="profile-position"
                value={form.position}
                onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))}
                className={`mt-1 ${inputClass}`}
              />
            </div>
          </div>
        </div>

        <button type="submit" className={`w-full ${primaryButtonClass}`}>
          {saved ? 'บันทึกแล้ว ✓' : 'บันทึกข้อมูล'}
        </button>
      </form>
      <Footer />
    </div>
  )
}
