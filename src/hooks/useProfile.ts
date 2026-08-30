import { useEffect, useState } from 'react'
import type { Profile } from '../types'
import { readJSON, writeJSON } from '../lib/storage'

const STORAGE_KEY = 'my-today:profile'

const emptyProfile: Profile = {
  name: '',
  profileImage: '',
  email: '',
  preferredName: '',
  studentId: '',
  faculty: '',
  major: '',
  organization: '',
  position: '',
  updatedAt: '',
}

// Sprint 12: record เดิมก่อน Sprint นี้ไม่มี updatedAt เลย — ให้ default เป็นค่าว่าง
// (ถือว่า "เก่าที่สุด" เทียบกับข้อมูลจาก Firestore เสมอตอน merge)
function normalizeProfile(profile: Profile): Profile {
  return { ...profile, updatedAt: profile.updatedAt ?? '' }
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(() =>
    normalizeProfile(readJSON<Profile>(STORAGE_KEY, emptyProfile)),
  )

  useEffect(() => {
    writeJSON(STORAGE_KEY, profile)
  }, [profile])

  function updateProfile(input: Profile) {
    setProfile({ ...input, updatedAt: new Date().toISOString() })
  }

  // Sprint 12: ใช้ตอน pull+merge จาก Firestore ตอน login เท่านั้น ไม่ stamp updatedAt ใหม่
  // (ต้องคงเวลาที่มาจาก remote/local ไว้ตามที่ merge แล้ว ไม่ใช่เวลาที่ merge เกิดขึ้น)
  function mergeFromRemote(remoteProfile: Profile | null) {
    if (!remoteProfile) return
    setProfile((prev) => (remoteProfile.updatedAt > prev.updatedAt ? remoteProfile : prev))
  }

  return { profile, updateProfile, mergeFromRemote }
}
