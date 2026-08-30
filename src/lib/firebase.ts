import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Sprint 12 (Version 3): optional Cloud Sync layer. This config is the standard
// Firebase client config — it is not a secret (access is controlled by Firestore
// Security Rules, not by hiding this object) — so it is safe to keep inline here,
// matching Firebase's own quickstart convention.
const firebaseConfig = {
  apiKey: 'AIzaSyDYClGQPueP0R6e3qCT0jp0CA-1-c-TUms',
  authDomain: 'my-today-a25d9.firebaseapp.com',
  projectId: 'my-today-a25d9',
  storageBucket: 'my-today-a25d9.firebasestorage.app',
  messagingSenderId: '952077623437',
  appId: '1:952077623437:web:f029ef0027ebfcf3c142c4',
  measurementId: 'G-NEMDDQCKZC',
}

export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
export const googleProvider = new GoogleAuthProvider()
