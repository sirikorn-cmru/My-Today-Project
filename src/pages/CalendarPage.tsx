import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DayAgenda } from '../components/DayAgenda'
import { EventFormModal } from '../components/EventFormModal'
import { EventDetailModal } from '../components/EventDetailModal'
import { Footer } from '../components/Footer'
import { getDayItems, getMonthGrid, getWeekDates, weekdayLabels } from '../lib/calendarUtils'
import { todayISO } from '../lib/taskUtils'
import { fabButtonClass, pageHeaderClass } from '../lib/uiClasses'
import type { CalendarEvent, CalendarEventInput, CalendarViewMode, FileRecord, LifeArea, Link, Note, Task } from '../types'

interface CalendarPageProps {
  events: CalendarEvent[]
  tasks: Task[]
  lifeAreas: LifeArea[]
  addEvent: (input: CalendarEventInput) => void
  updateEvent: (id: string, input: CalendarEventInput) => void
  deleteEvent: (id: string) => void
  files: FileRecord[]
  notes: Note[]
  links: Link[]
  onLinkFile: (fileId: string, eventId: string) => void
  onUnlinkFile: (fileId: string, eventId: string) => void
}

const viewLabels: Record<CalendarViewMode, string> = {
  today: 'วันนี้',
  week: 'สัปดาห์',
  month: 'เดือน',
}

export function CalendarPage({
  events,
  tasks,
  lifeAreas,
  addEvent,
  updateEvent,
  deleteEvent,
  files,
  notes,
  links,
  onLinkFile,
  onUnlinkFile,
}: CalendarPageProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialDate = searchParams.get('date')
  const [viewMode, setViewMode] = useState<CalendarViewMode>('today')
  const [selectedDate, setSelectedDate] = useState(() => initialDate || todayISO())
  const [detailEventId, setDetailEventId] = useState<string | null>(null)
  const detailEvent = events.find((e) => e.id === detailEventId) ?? null
  const [formOpen, setFormOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null)

  const today = todayISO()

  useEffect(() => {
    if (initialDate) setSearchParams({}, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function openCreate() {
    setEditingEvent(null)
    setFormOpen(true)
  }

  function openEditById(id: string) {
    const event = events.find((e) => e.id === id)
    if (event) {
      setEditingEvent(event)
      setFormOpen(true)
    }
  }

  function handleDeleteById(id: string) {
    const event = events.find((e) => e.id === id)
    if (!event) return
    const confirmed = window.confirm(`ลบกิจกรรม "${event.title}" ใช่หรือไม่?`)
    if (confirmed) deleteEvent(id)
  }

  function handleSubmit(input: CalendarEventInput) {
    if (editingEvent) {
      updateEvent(editingEvent.id, input)
    } else {
      addEvent(input)
    }
    setFormOpen(false)
    setEditingEvent(null)
  }

  function jumpToDay(date: string) {
    setSelectedDate(date)
    setViewMode('today')
  }

  function shiftWeek(deltaDays: number) {
    const d = new Date(`${selectedDate}T00:00:00`)
    d.setDate(d.getDate() + deltaDays)
    setSelectedDate(todayISO(d))
  }

  function shiftMonth(deltaMonths: number) {
    const d = new Date(`${selectedDate}T00:00:00`)
    d.setMonth(d.getMonth() + deltaMonths)
    setSelectedDate(todayISO(d))
  }

  const weekDates = useMemo(() => getWeekDates(new Date(`${selectedDate}T00:00:00`)), [selectedDate])
  const monthGrid = useMemo(() => getMonthGrid(new Date(`${selectedDate}T00:00:00`)), [selectedDate])
  const currentMonth = new Date(`${selectedDate}T00:00:00`).getMonth()

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      <header className={pageHeaderClass}>
        <h1 className="text-xl font-semibold">ปฏิทิน</h1>
      </header>

      <div className="flex gap-2 px-4 py-3 sm:px-6">
        {(Object.keys(viewLabels) as CalendarViewMode[]).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => {
              setViewMode(mode)
              if (mode === 'today') setSelectedDate(today)
            }}
            aria-pressed={viewMode === mode}
            className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
              viewMode === mode
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
            }`}
          >
            {viewLabels[mode]}
          </button>
        ))}
      </div>

      <div className="px-4 sm:px-6">
        {viewMode === 'today' && (
          <DayAgenda
            date={selectedDate}
            items={getDayItems(selectedDate, events, tasks, lifeAreas)}
            onViewEventDetail={setDetailEventId}
            onEditEvent={openEditById}
            onDeleteEvent={handleDeleteById}
          />
        )}

        {viewMode === 'week' && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => shiftWeek(-7)}
                className="rounded px-2 py-1 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                ← สัปดาห์ก่อน
              </button>
              <button
                type="button"
                onClick={() => shiftWeek(7)}
                className="rounded px-2 py-1 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                สัปดาห์ถัดไป →
              </button>
            </div>
            <div className="space-y-4">
              {weekDates.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => jumpToDay(date)}
                  className="block w-full rounded-xl text-left transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <DayAgenda date={date} items={getDayItems(date, events, tasks, lifeAreas)} showDateHeader />
                </button>
              ))}
            </div>
          </div>
        )}

        {viewMode === 'month' && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                className="rounded px-2 py-1 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                ← เดือนก่อน
              </button>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                className="rounded px-2 py-1 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                เดือนถัดไป →
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500">
              {weekdayLabels.map((label) => (
                <div key={label} className="py-1">
                  {label}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {monthGrid.flat().map((date) => {
                const count = getDayItems(date, events, tasks, lifeAreas).length
                const isCurrentMonth = new Date(`${date}T00:00:00`).getMonth() === currentMonth
                const isToday = date === today
                return (
                  <button
                    key={date}
                    type="button"
                    onClick={() => jumpToDay(date)}
                    aria-label={date}
                    aria-current={isToday ? 'date' : undefined}
                    className={`aspect-square rounded-lg p-1 text-xs ring-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 ${
                      isToday ? 'bg-blue-600 text-white ring-blue-600' : 'bg-white ring-slate-200 hover:bg-slate-50'
                    } ${!isCurrentMonth && !isToday ? 'text-slate-300' : 'text-slate-700'}`}
                  >
                    <div>{new Date(`${date}T00:00:00`).getDate()}</div>
                    {count > 0 && (
                      <div className={`mx-auto mt-0.5 h-1.5 w-1.5 rounded-full ${isToday ? 'bg-white' : 'bg-blue-500'}`} />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
      <Footer />

      <button type="button" onClick={openCreate} className={fabButtonClass}>
        + เพิ่มกิจกรรม
      </button>

      <EventFormModal
        open={formOpen}
        initialEvent={editingEvent}
        defaultDate={selectedDate}
        lifeAreas={lifeAreas}
        onClose={() => {
          setFormOpen(false)
          setEditingEvent(null)
        }}
        onSubmit={handleSubmit}
      />

      <EventDetailModal
        open={detailEventId !== null}
        event={detailEvent}
        lifeAreas={lifeAreas}
        files={files}
        notes={notes}
        links={links}
        onClose={() => setDetailEventId(null)}
        onUpdateEvent={updateEvent}
        onLinkFile={onLinkFile}
        onUnlinkFile={onUnlinkFile}
      />
    </main>
  )
}
