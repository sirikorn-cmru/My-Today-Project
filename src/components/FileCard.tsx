import { useEffect, useState } from 'react'
import type { FileRecord } from '../types'
import { downloadBlob, formatBytes, previewKind } from '../lib/fileUtils'

interface FileCardProps {
  file: FileRecord
  lifeAreaName?: string
  onDelete: (id: string) => void
}

export function FileCard({ file, lifeAreaName, onDelete }: FileCardProps) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [objectUrl, setObjectUrl] = useState<string | null>(null)
  const [textContent, setTextContent] = useState<string | null>(null)
  const kind = previewKind(file.mimeType)

  useEffect(() => {
    if (!previewOpen) return
    if (kind === 'image' || kind === 'pdf') {
      const url = URL.createObjectURL(file.blob)
      setObjectUrl(url)
      return () => URL.revokeObjectURL(url)
    }
    if (kind === 'text') {
      file.blob.text().then(setTextContent)
    }
  }, [previewOpen, kind, file.blob])

  function handleDelete() {
    const confirmed = window.confirm(`ลบไฟล์ "${file.name}" ใช่หรือไม่?`)
    if (confirmed) onDelete(file.id)
  }

  return (
    <li className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-medium text-slate-900">{file.name}</p>
          <p className="text-xs text-slate-500">
            {lifeAreaName && <span>{lifeAreaName} · </span>}
            {file.category} · {formatBytes(file.size)}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
          {file.linkedTaskIds.length > 0 ? `เชื่อม ${file.linkedTaskIds.length} งาน` : 'ยังไม่เชื่อมงาน'}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap gap-3 border-t border-slate-100 pt-2">
        {kind !== 'none' && (
          <button
            type="button"
            onClick={() => setPreviewOpen((v) => !v)}
            className="text-xs font-medium text-blue-600"
          >
            {previewOpen ? 'ซ่อน Preview' : 'Preview'}
          </button>
        )}
        <button
          type="button"
          onClick={() => downloadBlob(file.blob, file.name)}
          className="text-xs font-medium text-blue-600"
        >
          Download
        </button>
        <button type="button" onClick={handleDelete} className="text-xs font-medium text-rose-600">
          ลบ
        </button>
      </div>

      {previewOpen && (
        <div className="mt-2 rounded-lg bg-slate-50 p-2">
          {kind === 'image' && objectUrl && (
            <img src={objectUrl} alt={file.name} className="max-h-64 w-full rounded object-contain" />
          )}
          {kind === 'pdf' && objectUrl && <iframe src={objectUrl} title={file.name} className="h-64 w-full rounded" />}
          {kind === 'text' && (
            <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap text-xs text-slate-700">
              {textContent ?? 'กำลังโหลด...'}
            </pre>
          )}
        </div>
      )}
    </li>
  )
}
