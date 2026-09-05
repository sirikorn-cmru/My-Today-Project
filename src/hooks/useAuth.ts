import { useEffect, useState } from 'react'
import type { User } from 'firebase/auth'
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'

// Sprint 14 Business Rule 6: จุดเดียวที่รวม Firebase error code -> ข้อความไทย
// ให้ทั้ง Sign In/Sign Up/Reset Password/Google Sign-In ใช้ร่วมกัน — error code
// ที่ไม่อยู่ในรายการนี้ยังได้ fallback message ที่เข้าใจง่าย ไม่ปล่อย code ดิบหลุดออกไป
const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/wrong-password': 'รหัสผ่านไม่ถูกต้อง',
  'auth/email-already-in-use': 'อีเมลนี้มีผู้ใช้แล้ว',
  'auth/weak-password': 'รหัสผ่านสั้นเกินไป (อย่างน้อย 6 ตัวอักษร)',
  'auth/user-not-found': 'ไม่พบบัญชีนี้',
  'auth/invalid-email': 'รูปแบบอีเมลไม่ถูกต้อง',
  'auth/invalid-credential': 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
  'auth/too-many-requests': 'ลองผิดหลายครั้งเกินไป กรุณาลองใหม่ภายหลัง',
  'auth/operation-not-allowed': 'ระบบยังไม่ได้เปิดใช้งานการเข้าสู่ระบบด้วยอีเมล กรุณาติดต่อผู้ดูแลระบบ',
}

function translateAuthError(err: unknown, fallback: string): string {
  const code = err instanceof Error && 'code' in err ? (err as { code: string }).code : ''
  return AUTH_ERROR_MESSAGES[code] ?? fallback
}

// Sprint 12: Google Sign-In (Business Rule 5), Sprint 14: Email/Password เป็น
// วิธีที่สอง (คู่กัน ไม่ใช่แทนที่) — this hook only tracks auth identity. It
// does not decide whether Cloud Sync is on; that is a separate opt-in choice
// (see syncEnabled in App.tsx, Business Rule 2).
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
          setAuthError(translateAuthError(redirectErr, 'ลงชื่อเข้าใช้ไม่สำเร็จ'))
        }
        return
      }
      setAuthError(translateAuthError(err, 'ลงชื่อเข้าใช้ไม่สำเร็จ'))
    }
  }

  // Sprint 14: อีเมล/รหัสผ่าน เป็นวิธีล็อกอินที่สอง คู่กับ Google Sign-In
  // (Business Rule 1) — ไม่ต้องยืนยันอีเมลก่อนใช้งาน (Business Rule 2)
  async function signUpWithEmail(email: string, password: string) {
    setAuthError(null)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setAuthError(translateAuthError(err, 'สมัครสมาชิกไม่สำเร็จ'))
    }
  }

  async function signInWithEmail(email: string, password: string) {
    setAuthError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setAuthError(translateAuthError(err, 'เข้าสู่ระบบไม่สำเร็จ'))
    }
  }

  // Business Rule 3: บังคับต้องมี ไม่ใช่ nice-to-have — ไม่งั้นผู้ใช้ที่ลืม
  // รหัสผ่านจะเข้าบัญชีตัวเองไม่ได้อีกเลย
  async function resetPassword(email: string) {
    setAuthError(null)
    try {
      await sendPasswordResetEmail(auth, email)
      return true
    } catch (err) {
      setAuthError(translateAuthError(err, 'ส่งอีเมลรีเซ็ตรหัสผ่านไม่สำเร็จ'))
      return false
    }
  }

  async function signOutUser() {
    setAuthError(null)
    try {
      await signOut(auth)
    } catch (err) {
      setAuthError(translateAuthError(err, 'ออกจากระบบไม่สำเร็จ'))
    }
  }

  function clearAuthError() {
    setAuthError(null)
  }

  return {
    user,
    authLoading,
    authError,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    resetPassword,
    signOutUser,
    clearAuthError,
  }
}
