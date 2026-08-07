import { useState } from 'react'
import { FileCard } from '../components/FileCard'
import { FileFormModal } from '../components/FileFormModal'
import type { FileRecord, FileRecordInput, Task } from '../types'

interface FilesPageProps {
  files: FileRecord[]
  loaded: boolean
  tasks: Task[]
  addFile: (input: FileRecordInput) => void
  deleteFile: (id: string) => void
}

export function FilesPage({ files, loaded, tasks, addFile, deleteFile }: FilesPageProps) {
  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)

  const visibleFiles = files
    .filter((file) => {
      const q = search.trim().toLowerCase()
      if (!q) return true
      return `${file.name} ${file.category}`.toLowerCase().includes(q)
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <header className="bg-blue-600 px-4 py-6 text-white sm:px-6">
        <h1 className="text-xl font-semibold">ไฟล์</h1>
        <p className="mt-1 text-sm text-blue-100">{files.length} ไฟล์ทั้งหมด</p>
      </header>

      <section className="px-4 py-4 sm:px-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ค้นหาไฟล์..."
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
      </section>

      <section className="px-4 sm:px-6">
        {!loaded && <p className="text-center text-sm text-slate-500">กำลังโหลดไฟล์...</p>}
        {loaded && (
          <ul className="space-y-2">
            {visibleFiles.map((file) => (
              <FileCard key={file.id} file={file} onDelete={deleteFile} />
            ))}
            {visibleFiles.length === 0 && (
              <li className="rounded-xl bg-white p-4 text-center text-sm text-slate-500 shadow-sm ring-1 ring-slate-200">
                {files.length === 0 ? 'ยังไม่มีไฟล์ในระบบ' : 'ไม่พบไฟล์ที่ตรงกับเงื่อนไข'}
              </li>
            )}
          </ul>
        )}
      </section>

      <button
        type="button"
        onClick={() => setFormOpen(true)}
        className="fixed bottom-20 right-5 z-10 flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg"
      >
        + เพิ่มไฟล์
      </button>

      <FileFormModal
        open={formOpen}
        tasks={tasks}
        onClose={() => setFormOpen(false)}
        onSubmit={(input) => {
          addFile(input)
          setFormOpen(false)
        }}
      />
    </div>
  )
}
