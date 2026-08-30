import { useEffect, useState } from 'react'
import type { User } from 'firebase/auth'
import {
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'

// Sprint 12: Google Sign-In only (Business Rule 5) — this hook only tracks
// auth identity. It does not decide whether Cloud Sync is on; that is a
// separate opt-in choice (see syncEnabled in App.tsx, Business Rule 2).
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    // Completes a pending signInWithRedirect flow (the popup-blocked fallback
    // below) after the browser navigates back to the app.
    getRedirectResult(auth).catch((err) => {
      setAuthError(err instanceof Error ? err.message : 'ลงชื่อเข้าใช้ไม่สำเร็จ')
    })
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      setAuthLoading(false)
    })
    return unsubscribe
  }, [])

  async function signInWithGoogle() {
    setAuthError(null)
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      // Some browsers/embedded webviews always block popups — fall back to a
      // full-page redirect flow rather than surfacing this as a hard failure.
      const code = err instanceof Error && 'code' in err ? (err as { code: string }).code : ''
      if (code === 'auth/popup-blocked' || code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        try {
          await signInWithRedirect(auth, googleProvider)
        } catch (redirectErr) {
          setAuthError(redirectErr instanceof Error ? redirectErr.message : 'ลงชื่อเข้าใช้ไม่สำเร็จ')
        }
        return
      }
      setAuthError(err instanceof Error ? err.message : 'ลงชื่อเข้าใช้ไม่สำเร็จ')
    }
  }

  async function signOutUser() {
    setAuthError(null)
    try {
      await signOut(auth)
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'ออกจากระบบไม่สำเร็จ')
    }
  }

  function clearAuthError() {
    setAuthError(null)
  }

  return { user, authLoading, authError, signInWithGoogle, signOutUser, clearAuthError }
}
