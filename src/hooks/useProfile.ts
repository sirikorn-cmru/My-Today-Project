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
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(() => readJSON<Profile>(STORAGE_KEY, emptyProfile))

  useEffect(() => {
    writeJSON(STORAGE_KEY, profile)
  }, [profile])

  function updateProfile(input: Profile) {
    setProfile(input)
  }

  return { profile, updateProfile }
}
