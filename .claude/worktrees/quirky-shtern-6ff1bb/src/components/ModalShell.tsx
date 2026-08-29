import { useEffect, useRef } from 'react'

interface ModalShellProps {
  titleId: string
  onClose: () => void
  children: React.ReactNode
}

// Shared accessible dialog chrome for the Task/Event/File forms: traps Escape-to-close,
// marks the dialog role for screen readers, and autofocuses the first field on open —
// all three modals previously re-implemented the backdrop/click-outside logic separately.
export function ModalShell({ titleId, onClose, children }: ModalShellProps) {
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    const firstField = formRef.current?.querySelector<HTMLElement>('input, textarea, select')
    firstField?.focus()
  }, [])

  return (
    <div
      className="fixed inset-0 z-20 flex items-end justify-center overflow-y-auto bg-slate-900/40 sm:items-center"
      onClick={onClose}
    >
      <div
        ref={formRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-t-2xl bg-white p-5 shadow-lg sm:my-8 sm:rounded-2xl"
      >
        {children}
      </div>
    </div>
  )
}
