import { useState } from 'react'
import { FileCard } from '../components/FileCard'
import { FileFormModal } from '../components/FileFormModal'
import { Footer } from '../components/Footer'
import { getLifeAreaName } from '../lib/lifeAreaUtils'
import { emptyStateClass, fabButtonClass, inputClass, pageHeaderClass } from '../lib/uiClasses'
import type { FileRecord, FileRecordInput, LifeArea, Task } from '../types'

interface FilesPageProps {
  files: FileRecord[]
  loaded: boolean
  error: string | null
  clearError: () => void
  tasks: Task[]
  lifeAreas: LifeArea[]
  addFile: (input: FileRecordInput) => void
  deleteFile: (id: string) => void
}

export function FilesPage({ files, loaded, error, clearError, tasks, lifeAreas, addFile, deleteFile }: FilesPageProps) {
  const [search, setSearch] = useState('')
  const [lifeAreaFilter, setLifeAreaFilter] = useState('All')
  const [formOpen, setFormOpen] = useState(false)

  const visibleFiles = files
    .filter((file) => {
      if (lifeAreaFilter !== 'All' && file.lifeAreaId !== lifeAreaFilter) return false
      const q = search.trim().toLowerCase()
      if (!q) return true
      return `${file.name} ${file.category}`.toLowerCase().includes(q)
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <header className={pageHeaderClass}>
        <h1 className="text-xl font-semibold">ไฟล์</h1>
        <p className="mt-1 text-sm text-blue-100">{files.length} ไฟล์ทั้งหมด</p>
      </header>

      {error && (
        <div
          role="alert"
          className="mx-4 mt-4 flex items-start justify-between gap-2 rounded-lg bg-rose-50 p-3 text-sm text-rose-700 ring-1 ring-rose-200 sm:mx-6"
        >
          <span>{error}</span>
          <button
            type="button"
            onClick={clearError}
            className="shrink-0 rounded font-medium transition-colors hover:text-rose-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            ปิด
          </button>
        </div>
      )}

      <section className="space-y-2 px-4 py-4 sm:px-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ค้นหาไฟล์..."
          aria-label="ค้นหาไฟล์"
          className={inputClass}
        />
        <select
          value={lifeAreaFilter}
          onChange={(e) => setLifeAreaFilter(e.target.value)}
          aria-label="กรองตาม Life Area"
          className={inputClass}
        >
          <option value="All">ทุก Life Area</option>
          {lifeAreas.map((la) => (
            <option key={la.id} value={la.id}>
              {la.name}
            </option>
          ))}
        </select>
      </section>

      <section className="px-4 sm:px-6">
        {!loaded && (
          <p className="flex items-center justify-center gap-2 py-4 text-center text-sm text-slate-500">
            <span
              aria-hidden
              className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600"
            />
            กำลังโหลดไฟล์...
          </p>
        )}
        {loaded && (
          <ul className="space-y-2">
            {visibleFiles.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                lifeAreaName={getLifeAreaName(lifeAreas, file.lifeAreaId)}
                onDelete={deleteFile}
              />
            ))}
            {visibleFiles.length === 0 && (
              <li className={emptyStateClass}>
                {files.length === 0 ? 'ยังไม่มีไฟล์ในระบบ' : 'ไม่พบไฟล์ที่ตรงกับเงื่อนไข'}
              </li>
            )}
          </ul>
        )}
      </section>
      <Footer />

      <button type="button" onClick={() => setFormOpen(true)} className={fabButtonClass}>
        + เพิ่มไฟล์
      </button>

      <FileFormModal
        open={formOpen}
        tasks={tasks}
        lifeAreas={lifeAreas}
        onClose={() => setFormOpen(false)}
        onSubmit={(input) => {
          addFile(input)
          setFormOpen(false)
        }}
      />
    </div>
  )
}
