import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing'
import { readFileSync } from 'node:fs'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const testEnv = await initializeTestEnvironment({
  projectId: 'my-today-a25d9',
  firestore: {
    rules: readFileSync('firestore.rules', 'utf8'),
    host: '127.0.0.1',
    port: 8080,
  },
})

let failures = 0
function check(name, ok) {
  console.log(`${ok ? 'PASS' : 'FAIL'} — ${name}`)
  if (!ok) failures++
}

const alice = testEnv.authenticatedContext('alice')
const bob = testEnv.authenticatedContext('bob')
const anon = testEnv.unauthenticatedContext()

// Alice can write and read her own task
await assertSucceeds(
  setDoc(doc(alice.firestore(), 'users/alice/tasks/t1'), { id: 't1', title: 'test', updatedAt: '2026-01-01' }),
)
check('Alice can write her own task', true)

const aliceReadOwn = await getDoc(doc(alice.firestore(), 'users/alice/tasks/t1'))
check('Alice can read her own task back', aliceReadOwn.exists())

// Bob cannot read Alice's task
try {
  await assertFails(getDoc(doc(bob.firestore(), 'users/alice/tasks/t1')))
  check("Bob cannot read Alice's task", true)
} catch {
  check("Bob cannot read Alice's task", false)
}

// Bob cannot write into Alice's collection
try {
  await assertFails(setDoc(doc(bob.firestore(), 'users/alice/tasks/t2'), { id: 't2', title: 'hack', updatedAt: '2026-01-01' }))
  check("Bob cannot write into Alice's collection", true)
} catch {
  check("Bob cannot write into Alice's collection", false)
}

// Unauthenticated user cannot read or write anything
try {
  await assertFails(getDoc(doc(anon.firestore(), 'users/alice/tasks/t1')))
  check('Unauthenticated user cannot read', true)
} catch {
  check('Unauthenticated user cannot read', false)
}
try {
  await assertFails(setDoc(doc(anon.firestore(), 'users/alice/tasks/t3'), { id: 't3', title: 'anon', updatedAt: '2026-01-01' }))
  check('Unauthenticated user cannot write', true)
} catch {
  check('Unauthenticated user cannot write', false)
}

// Bob can write/read his own data (sanity check the rule isn't overly restrictive)
await assertSucceeds(
  setDoc(doc(bob.firestore(), 'users/bob/tasks/t4'), { id: 't4', title: 'bob task', updatedAt: '2026-01-01' }),
)
const bobReadOwn = await getDoc(doc(bob.firestore(), 'users/bob/tasks/t4'))
check('Bob can write and read his own task', bobReadOwn.exists())

await testEnv.cleanup()

console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`)
process.exit(failures === 0 ? 0 : 1)
