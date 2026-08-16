// Shared Tailwind class strings so every page/component gets the same focus rings,
// hover/active feedback, and touch-target sizing instead of re-deriving it per file.

export const cardClass = 'rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200'

export const emptyStateClass =
  'rounded-xl bg-white p-4 text-center text-sm text-slate-500 shadow-sm ring-1 ring-slate-200'

export const inputClass =
  'w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-400'

export const primaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'

export const secondaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 active:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'

export const linkButtonClass =
  'inline-flex min-h-[32px] items-center rounded px-1 text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'

export const dangerLinkButtonClass =
  'inline-flex min-h-[32px] items-center rounded px-1 text-xs font-medium text-rose-600 transition-colors hover:text-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500'

export const iconButtonClass =
  'inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-500 text-lg transition-colors hover:bg-blue-400 active:bg-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600'

export const fabButtonClass =
  'fixed bottom-20 right-5 z-10 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-blue-700 active:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'

export const pageHeaderClass = 'bg-blue-600 px-4 py-6 text-white sm:px-6'
