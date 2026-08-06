interface QuickActionModalProps {
  open: boolean
  onClose: () => void
}

export function QuickActionModal({ open, onClose }: QuickActionModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-20 flex items-end justify-center bg-slate-900/40 sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-t-2xl bg-white p-5 shadow-lg sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-slate-900">เพิ่มงานใหม่</h3>
        <p className="mt-1 text-sm text-slate-500">
          ฟีเจอร์เพิ่มงานจริงจะเปิดใช้งานใน Sprint 2 — ตอนนี้เป็นตัวอย่างหน้าจอเท่านั้น
        </p>

        <div className="mt-4 space-y-3">
          <div>
            <label className="text-xs font-medium text-slate-500">ชื่องาน</label>
            <input
              disabled
              placeholder="เช่น ส่งรายงาน STEM"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Deadline</label>
            <input
              disabled
              placeholder="วว/ดด/ปปปป เวลา"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white"
        >
          ปิด
        </button>
      </div>
    </div>
  )
}
