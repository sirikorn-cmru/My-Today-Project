import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split vendor code out of the app chunk. Firebase is by far the
        // largest dependency (~676 kB of the old single 973 kB bundle) and is
        // split again per product, because keeping it in one piece leaves a
        // chunk well over Vite's 500 kB warning threshold.
        //
        // Match on 'firebase/firestore' rather than '@firebase/firestore':
        // the scoped path contains the unscoped one as a substring, so a
        // single test catches BOTH the umbrella re-export (firebase/firestore)
        // and the real implementation (@firebase/firestore). Matching only the
        // scoped form sends the umbrella file to the core chunk instead, which
        // makes core and firestore import each other — that is exactly the
        // "Circular chunk" warning Rollup emits, so keep these tests as they are.
        manualChunks(id) {
          const path = id.replace(/\\/g, '/')
          if (!path.includes('node_modules')) return undefined
          if (path.includes('firebase/firestore')) return 'firebase-firestore'
          if (path.includes('firebase/auth')) return 'firebase-auth'
          if (path.includes('firebase/') || path.includes('@firebase')) return 'firebase-core'
          if (path.includes('/react-router') || path.includes('/@remix-run/')) return 'router'
          if (
            path.includes('/react/') ||
            path.includes('/react-dom/') ||
            path.includes('/scheduler/')
          ) {
            return 'react'
          }
          return undefined
        },
      },
    },
  },
})
