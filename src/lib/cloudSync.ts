import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { db } from './firebase'

// Sprint 12 Business Rule 6: data lives under users/{uid}/{collection}/{id} so
// Firestore Security Rules can scope access to request.auth.uid alone.
interface SyncableItem {
  id: string
  updatedAt: string
}

function collectionRef(uid: string, collectionName: string) {
  return collection(db, 'users', uid, collectionName)
}

// Business Rule 8: last-write-wins by updatedAt timestamp — no field-by-field merge.
// Pure merge function: does not touch local storage itself, the caller decides what
// to do with the result (see App.tsx's one-time pull-on-login).
export async function pullAndMerge<T extends SyncableItem>(
  uid: string,
  collectionName: string,
  localItems: T[],
): Promise<T[]> {
  const snapshot = await getDocs(collectionRef(uid, collectionName))
  const remoteById = new Map<string, T>()
  snapshot.forEach((docSnap) => {
    remoteById.set(docSnap.id, docSnap.data() as T)
  })

  const localById = new Map(localItems.map((item) => [item.id, item]))
  const mergedById = new Map<string, T>()

  for (const [id, remoteItem] of remoteById) {
    mergedById.set(id, remoteItem)
  }
  for (const [id, localItem] of localById) {
    const remoteItem = remoteById.get(id)
    if (!remoteItem || localItem.updatedAt > remoteItem.updatedAt) {
      mergedById.set(id, localItem)
    }
  }

  return Array.from(mergedById.values())
}

// Business Rule 1: local-first — this is called after the local write already
// happened, fire-and-forget, never blocking the caller. Reconciles the remote
// collection to match localItems: upserts anything newer/missing remotely,
// deletes anything remote that no longer exists locally (was deleted locally).
export async function pushDiff<T extends SyncableItem>(
  uid: string,
  collectionName: string,
  localItems: T[],
): Promise<void> {
  const snapshot = await getDocs(collectionRef(uid, collectionName))
  const remoteById = new Map<string, T>()
  snapshot.forEach((docSnap) => {
    remoteById.set(docSnap.id, docSnap.data() as T)
  })

  const localIds = new Set(localItems.map((item) => item.id))

  const writes: Promise<void>[] = []
  for (const item of localItems) {
    const remoteItem = remoteById.get(item.id)
    if (!remoteItem || item.updatedAt > remoteItem.updatedAt) {
      writes.push(setDoc(doc(collectionRef(uid, collectionName), item.id), item))
    }
  }
  for (const remoteId of remoteById.keys()) {
    if (!localIds.has(remoteId)) {
      writes.push(deleteDoc(doc(collectionRef(uid, collectionName), remoteId)))
    }
  }

  await Promise.all(writes)
}

// Profile is a single record, not a collection of ids — handled separately.
export async function pullProfile<T extends { updatedAt: string }>(
  uid: string,
): Promise<T | null> {
  const snap = await getDoc(doc(db, 'users', uid, 'meta', 'profile'))
  return snap.exists() ? (snap.data() as T) : null
}

export async function pushProfile<T extends { updatedAt: string }>(uid: string, profile: T): Promise<void> {
  await setDoc(doc(db, 'users', uid, 'meta', 'profile'), profile)
}
