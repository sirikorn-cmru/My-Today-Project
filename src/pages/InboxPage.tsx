import { useState } from 'react'
import { Footer } from '../components/Footer'
import { TaskFormModal } from '../components/TaskFormModal'
import { EventFormModal } from '../components/EventFormModal'
import { FileFormModal } from '../components/FileFormModal'
import { NoteFormModal } from '../components/NoteFormModal'
import { LinkFormModal } from '../components/LinkFormModal'
import { getLifeAreaName } from '../lib/lifeAreaUtils'
import {
  cardClass,
  dangerLinkButtonClass,
  emptyStateClass,
  inputClass,
  linkButtonClass,
  pageHeaderClass,
  primaryButtonClass,
} from '../lib/uiClasses'
import type {
  CalendarEvent,
  CalendarEventInput,
  FileRecord,
  InboxKind,
  LifeArea,
  Link,
  LinkInput,
  Note,
  NoteInput,
  Task,
  TaskInput,
} from '../types'

interface InboxPageProps {
  tasks: Task[]
  events: CalendarEvent[]
  files: FileRecord[]
  filesLoaded: boolean
  notes: Note[]
  links: Link[]
  lifeAreas: LifeArea[]
  updateTask: (id: string, input: TaskInput) => void
  deleteTask: (id: string) => void
  updateEvent: (id: string, input: CalendarEventInput) => void
  deleteEvent: (id: string) => void
  updateFile: (
    id: string,
    patch: Partial<Pick<FileRecord, 'name' | 'category' | 'lifeAreaId' | 'linkedTaskIds' | 'linkedEventIds' | 'inInbox'>>,
  ) => void
  deleteFile: (id: string) => void
  addNote: (input: NoteInput) => void
  updateNote: (id: string, input: NoteInput) => void
  deleteNote: (id: string) => void
  addLink: (input: LinkInput) => void
  updateLink: (id: string, input: LinkInput) => void
  deleteLink: (id: string) => void
}

interface InboxRow {
  kind: InboxKind
  id: string
  title: string
  createdAt: string
}

const kindLabel: Record<InboxKind, string> = {
  task: 'งาน',
  event: 'กิจกรรม',
  file: 'ไฟล์',
  note: 'บันทึก',
  link: 'ลิงก์',
}

const kindBadge: Record<InboxKind, string> = {
  task: 'bg-blue-100 text-blue-700',
  event: 'bg-amber-100 text-amber-700',
  file: 'bg-slate-100 text-slate-600',
  note: 'bg-emerald-100 text-emerald-700',
  link: 'bg-purple-100 text-purple-700',
}

type Tab = 'inbox' | 'notes' | 'links'

export function InboxPage({
  tasks,
  events,
  files,
  filesLoaded,
  notes,
  links,
  lifeAreas,
  updateTask,
  deleteTask,
  updateEvent,
  deleteEvent,
  updateFile,
  deleteFile,
  addNote,
  updateNote,
  deleteNote,
  addLink,
  updateLink,
  deleteLink,
}: InboxPageProps) {
  const [tab, setTab] = useState<Tab>('inbox')

  const [organizingTaskId, setOrganizingTaskId] = useState<string | null>(null)
  const [organizingEventId, setOrganizingEventId] = useState<string | null>(null)
  const [organizingFileId, setOrganizingFileId] = useState<string | null>(null)

  const [noteModalOpen, setNoteModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [linkModalOpen, setLinkModalOpen] = useState(false)
  const [editingLink, setEditingLink] = useState<Link | null>(null)

  const [notesSearch, setNotesSearch] = useState('')
  const [linksSearch, setLinksSearch] = useState('')

  const inboxRows: InboxRow[] = [
    ...tasks
      .filter((t) => t.inInbox)
      .map((t) => ({ kind: 'task' as const, id: t.id, title: t.title, createdAt: t.createdAt })),
    ...events
      .filter((e) => e.inInbox)
      .map((e) => ({ kind: 'event' as const, id: e.id, title: e.title, createdAt: e.createdAt })),
    ...(filesLoaded
      ? files
          .filter((f) => f.inInbox)
          .map((f) => ({ kind: 'file' as const, id: f.id, title: f.name, createdAt: f.createdAt }))
      : []),
    ...notes
      .filter((n) => n.inInbox)
      .map((n) => ({ kind: 'note' as const, id: n.id, title: n.title, createdAt: n.createdAt })),
    ...links
      .filter((l) => l.inInbox)
      .map((l) => ({ kind: 'link' as const, id: l.id, title: l.title, createdAt: l.createdAt })),
  ].sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  function openOrganize(row: InboxRow) {
    if (row.kind === 'task') setOrganizingTaskId(row.id)
    if (row.kind === 'event') setOrganizingEventId(row.id)
    if (row.kind === 'file') setOrganizingFileId(row.id)
    if (row.kind === 'note') {
      setEditingNote(notes.find((n) => n.id === row.id) ?? null)
      setNoteModalOpen(true)
    }
    if (row.kind === 'link') {
      setEditingLink(links.find((l) => l.id === row.id) ?? null)
      setLinkModalOpen(true)
    }
  }

  function handleDeleteRow(row: InboxRow) {
    const confirmed = window.confirm(`ลบ "${row.title}" ใช่หรือไม่?`)
    if (!confirmed) return
    if (row.kind === 'task') deleteTask(row.id)
    if (row.kind === 'event') deleteEvent(row.id)
    if (row.kind === 'file') deleteFile(row.id)
    if (row.kind === 'note') deleteNote(row.id)
    if (row.kind === 'link') deleteLink(row.id)
  }

  const organizingTask = tasks.find((t) => t.id === organizingTaskId) ?? null
  const organizingEvent = events.find((e) => e.id === organizingEventId) ?? null
  const organizingFile = files.find((f) => f.id === organizingFileId) ?? null

  const visibleNotes = notes
    .filter((n) => !n.inInbox)
    .filter((n) => `${n.title} ${n.content}`.toLowerCase().includes(notesSearch.trim().toLowerCase()))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  const visibleLinks = links
    .filter((l) => !l.inInbox)
    .filter((l) => `${l.title} ${l.url}`.toLowerCase().includes(linksSearch.trim().toLowerCase()))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  function handleDeleteNote(note: Note) {
    const confirmed = window.confirm(`ลบบันทึก "${note.title}" ใช่หรือไม่?`)
    if (confirmed) deleteNote(note.id)
  }

  function handleDeleteLink(link: Link) {
    const confirmed = window.confirm(`ลบลิงก์ "${link.title}" ใช่หรือไม่?`)
    if (confirmed) deleteLink(link.id)
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'inbox', label: `Inbox (${inboxRows.length})` },
    { key: 'notes', label: 'บันทึก' },
    { key: 'links', label: 'ลิงก์' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <header className={pageHeaderClass}>
        <h1 className="text-xl font-semibold">My Inbox</h1>
        <p className="mt-1 text-sm text-blue-100">{inboxRows.length} รายการยังไม่ได้จัด Life Area</p>
      </header>

      <div className="flex gap-2 px-4 py-3 sm:px-6">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            aria-pressed={tab === key}
            className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
              tab === key
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'inbox' && (
        <section className="px-4 sm:px-6">
          <ul className="space-y-2">
            {inboxRows.map((row) => (
              <li key={`${row.kind}-${row.id}`} className={`${cardClass} p-3`}>
                <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${kindBadge[row.kind]}`}>
                  {kindLabel[row.kind]}
                </span>
                <p className="mt-1 truncate font-medium text-slate-900">{row.title}</p>
                <div className="mt-2 flex justify-end gap-3 border-t border-slate-100 pt-2">
                  <button type="button" onClick={() => openOrganize(row)} className={linkButtonClass}>
                    จัดเข้า Life Area
                  </button>
                  <button type="button" onClick={() => handleDeleteRow(row)} className={dangerLinkButtonClass}>
                    ลบ
                  </button>
                </div>
              </li>
            ))}
            {inboxRows.length === 0 && (
              <li className={emptyStateClass}>Inbox ว่างเปล่า — จัดเข้า Life Area ครบหมดแล้ว 🎉</li>
            )}
          </ul>
        </section>
      )}

      {tab === 'notes' && (
        <section className="px-4 sm:px-6">
          <input
            value={notesSearch}
            onChange={(e) => setNotesSearch(e.target.value)}
            placeholder="ค้นหาบันทึก..."
            aria-label="ค้นหาบันทึก"
            className={`mb-2 ${inputClass}`}
          />
          <ul className="space-y-2">
            {visibleNotes.map((note) => (
              <li key={note.id} className={`${cardClass} p-3`}>
                {getLifeAreaName(lifeAreas, note.lifeAreaId) && (
                  <p className="text-xs text-slate-500">{getLifeAreaName(lifeAreas, note.lifeAreaId)}</p>
                )}
                <p className="truncate font-medium text-slate-900">{note.title}</p>
                {note.content && <p className="mt-1 text-xs text-slate-500">{note.content}</p>}
                <div className="mt-2 flex justify-end gap-3 border-t border-slate-100 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingNote(note)
                      setNoteModalOpen(true)
                    }}
                    className={linkButtonClass}
                  >
                    แก้ไข
                  </button>
                  <button type="button" onClick={() => handleDeleteNote(note)} className={dangerLinkButtonClass}>
                    ลบ
                  </button>
                </div>
              </li>
            ))}
            {visibleNotes.length === 0 && (
              <li className={emptyStateClass}>{notes.length === 0 ? 'ยังไม่มีบันทึก' : 'ไม่พบบันทึกที่ตรงกับเงื่อนไข'}</li>
            )}
          </ul>
          <button
            type="button"
            onClick={() => {
              setEditingNote(null)
              setNoteModalOpen(true)
            }}
            className={`mt-3 w-full ${primaryButtonClass}`}
          >
            + เพิ่มบันทึก
          </button>
        </section>
      )}

      {tab === 'links' && (
        <section className="px-4 sm:px-6">
          <input
            value={linksSearch}
            onChange={(e) => setLinksSearch(e.target.value)}
            placeholder="ค้นหาลิงก์..."
            aria-label="ค้นหาลิงก์"
            className={`mb-2 ${inputClass}`}
          />
          <ul className="space-y-2">
            {visibleLinks.map((link) => (
              <li key={link.id} className={`${cardClass} p-3`}>
                {getLifeAreaName(lifeAreas, link.lifeAreaId) && (
                  <p className="text-xs text-slate-500">{getLifeAreaName(lifeAreas, link.lifeAreaId)}</p>
                )}
                <p className="truncate font-medium text-slate-900">{link.title}</p>
                {link.url && (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block truncate text-xs text-blue-600 underline"
                  >
                    {link.url}
                  </a>
                )}
                <div className="mt-2 flex justify-end gap-3 border-t border-slate-100 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingLink(link)
                      setLinkModalOpen(true)
                    }}
                    className={linkButtonClass}
                  >
                    แก้ไข
                  </button>
                  <button type="button" onClick={() => handleDeleteLink(link)} className={dangerLinkButtonClass}>
                    ลบ
                  </button>
                </div>
              </li>
            ))}
            {visibleLinks.length === 0 && (
              <li className={emptyStateClass}>{links.length === 0 ? 'ยังไม่มีลิงก์' : 'ไม่พบลิงก์ที่ตรงกับเงื่อนไข'}</li>
            )}
          </ul>
          <button
            type="button"
            onClick={() => {
              setEditingLink(null)
              setLinkModalOpen(true)
            }}
            className={`mt-3 w-full ${primaryButtonClass}`}
          >
            + เพิ่มลิงก์
          </button>
        </section>
      )}

      <Footer />

      <TaskFormModal
        open={organizingTaskId !== null}
        initialTask={organizingTask}
        lifeAreas={lifeAreas}
        onClose={() => setOrganizingTaskId(null)}
        onSubmit={(input) => {
          if (organizingTaskId) updateTask(organizingTaskId, input)
          setOrganizingTaskId(null)
        }}
      />
      <EventFormModal
        open={organizingEventId !== null}
        initialEvent={organizingEvent}
        lifeAreas={lifeAreas}
        onClose={() => setOrganizingEventId(null)}
        onSubmit={(input) => {
          if (organizingEventId) updateEvent(organizingEventId, input)
          setOrganizingEventId(null)
        }}
      />
      <FileFormModal
        open={organizingFileId !== null}
        initialFile={organizingFile}
        tasks={tasks}
        lifeAreas={lifeAreas}
        onClose={() => setOrganizingFileId(null)}
        onSubmit={() => {}}
        onUpdate={(id, patch) => {
          updateFile(id, patch)
          setOrganizingFileId(null)
        }}
      />
      <NoteFormModal
        open={noteModalOpen}
        initialNote={editingNote}
        lifeAreas={lifeAreas}
        onClose={() => setNoteModalOpen(false)}
        onSubmit={(input) => {
          if (editingNote) updateNote(editingNote.id, input)
          else addNote(input)
          setNoteModalOpen(false)
        }}
      />
      <LinkFormModal
        open={linkModalOpen}
        initialLink={editingLink}
        lifeAreas={lifeAreas}
        onClose={() => setLinkModalOpen(false)}
        onSubmit={(input) => {
          if (editingLink) updateLink(editingLink.id, input)
          else addLink(input)
          setLinkModalOpen(false)
        }}
      />
    </div>
  )
}
