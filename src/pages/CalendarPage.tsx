import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DayAgenda } from '../components/DayAgenda'
import { EventFormModal } from '../components/EventFormModal'
import { Footer } from '../components/Footer'
import { getDayItems, getMonthGrid, getWeekDates, weekdayLabels } from '../lib/calendarUtils'
import { todayISO } from '../lib/taskUtils'
import type { CalendarEvent, CalendarEventInput, CalendarViewMode, Task } from '../types'

interface CalendarPageProps {
  events: CalendarEvent[]
  tasks: Task[]
  addEvent: (input: CalendarEventInput) => void
  updateEvent: (id: string, input: CalendarEventInput) => void
  deleteEvent: (id: string) => void
}

const viewLabels: Record<CalendarViewMode, string> = {
  today: 'วันนี้',
  week: 'สัปดาห์',
  month: 'เดือน',
}

export function CalendarPage({ events, tasks, addEvent, updateEvent, deleteEvent }: CalendarPageProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialDate = searchParams.get('date')
  const [viewMode, setViewMode] = useState<CalendarViewMode>('today')
  const [selectedDate, setSelectedDate] = useState(() => initialDate || todayISO())
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
    <div className="min-h-screen bg-slate-50 pb-24">
      <header className="bg-blue-600 px-4 py-6 text-white sm:px-6">
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
            className={`flex-1 rounded-lg py-2 text-sm font-medium ${
              viewMode === mode ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200'
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
            items={getDayItems(selectedDate, events, tasks)}
            onEditEvent={openEditById}
            onDeleteEvent={handleDeleteById}
          />
        )}

        {viewMode === 'week' && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <button type="button" onClick={() => shiftWeek(-7)} className="px-2 py-1 text-sm text-blue-600">
                ← สัปดาห์ก่อน
              </button>
              <button type="button" onClick={() => shiftWeek(7)} className="px-2 py-1 text-sm text-blue-600">
                สัปดาห์ถัดไป →
              </button>
            </div>
            <div className="space-y-4">
              {weekDates.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => jumpToDay(date)}
                  className="block w-full text-left"
                >
                  <DayAgenda date={date} items={getDayItems(date, events, tasks)} showDateHeader />
                </button>
              ))}
            </div>
          </div>
        )}

        {viewMode === 'month' && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <button type="button" onClick={() => shiftMonth(-1)} className="px-2 py-1 text-sm text-blue-600">
                ← เดือนก่อน
              </button>
              <button type="button" onClick={() => shiftMonth(1)} className="px-2 py-1 text-sm text-blue-600">
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
                const count = getDayItems(date, events, tasks).length
                const isCurrentMonth = new Date(`${date}T00:00:00`).getMonth() === currentMonth
                const isToday = date === today
                return (
                  <button
                    key={date}
                    type="button"
                    onClick={() => jumpToDay(date)}
                    className={`aspect-square rounded-lg p-1 text-xs ring-1 ${
                      isToday ? 'bg-blue-600 text-white ring-blue-600' : 'bg-white ring-slate-200'
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

      <button
        type="button"
        onClick={openCreate}
        className="fixed bottom-20 right-5 z-10 flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg"
      >
        + เพิ่มกิจกรรม
      </button>

      <EventFormModal
        open={formOpen}
        initialEvent={editingEvent}
        defaultDate={selectedDate}
        onClose={() => {
          setFormOpen(false)
          setEditingEvent(null)
        }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
