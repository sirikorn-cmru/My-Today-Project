import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { QuickCaptureModal } from './components/QuickCaptureModal'
import { DashboardPage } from './pages/DashboardPage'
import { TasksPage } from './pages/TasksPage'
import { CalendarPage } from './pages/CalendarPage'
import { TimelinePage } from './pages/TimelinePage'
import { FilesPage } from './pages/FilesPage'
import { InboxPage } from './pages/InboxPage'
import { NotificationsPage } from './pages/NotificationsPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { LifeAreasPage } from './pages/LifeAreasPage'
import { ProfilePage } from './pages/ProfilePage'
import { useTasks } from './hooks/useTasks'
import { useEvents } from './hooks/useEvents'
import { useFiles } from './hooks/useFiles'
import { useNotes } from './hooks/useNotes'
import { useLinks } from './hooks/useLinks'
import { useNotifications } from './hooks/useNotifications'
import { useLifeAreas } from './hooks/useLifeAreas'
import { useProfile } from './hooks/useProfile'

function App() {
  const { tasks, addTask, updateTask, deleteTask, setStatus } = useTasks()
  const { events, addEvent, updateEvent, deleteEvent } = useEvents()
  const {
    files,
    loaded: filesLoaded,
    error: filesError,
    clearError: clearFilesError,
    quotaWarning: filesQuotaWarning,
    clearQuotaWarning: clearFilesQuotaWarning,
    addFile,
    deleteFile,
    linkFileToTask,
    unlinkFileFromTask,
    linkFileToEvent,
    unlinkFileFromEvent,
    updateFileLifeArea,
    updateFile,
  } = useFiles()
  const { notes, addNote, updateNote, deleteNote } = useNotes()
  const { links, addLink, updateLink, deleteLink } = useLinks()
  const { notifications, unreadCount, markRead, markAllRead, permission, requestPermission } = useNotifications(
    tasks,
    events,
  )
  const { lifeAreas, addLifeArea, updateLifeArea, deleteLifeArea } = useLifeAreas()
  const { profile, updateProfile } = useProfile()
  const [quickCaptureOpen, setQuickCaptureOpen] = useState(false)

  const inboxCount =
    tasks.filter((t) => t.inInbox).length +
    events.filter((e) => e.inInbox).length +
    (filesLoaded ? files.filter((f) => f.inInbox).length : 0) +
    notes.filter((n) => n.inInbox).length +
    links.filter((l) => l.inInbox).length

  // Deleting a Life Area must not delete the Tasks/Events/Files/Notes/Links that referenced
  // it — they stay, just with no Life Area anymore (Sprint 7 Acceptance Criteria, extended to
  // Note/Link once those entities existed in Sprint 8). Clear the stale reference on every
  // record that pointed at it before removing the Life Area itself.
  function handleDeleteLifeArea(id: string) {
    tasks.filter((t) => t.lifeAreaId === id).forEach((t) => updateTask(t.id, { ...t, lifeAreaId: '' }))
    events.filter((e) => e.lifeAreaId === id).forEach((e) => updateEvent(e.id, { ...e, lifeAreaId: '' }))
    files.filter((f) => f.lifeAreaId === id).forEach((f) => updateFileLifeArea(f.id, ''))
    notes.filter((n) => n.lifeAreaId === id).forEach((n) => updateNote(n.id, { ...n, lifeAreaId: '' }))
    links.filter((l) => l.lifeAreaId === id).forEach((l) => updateLink(l.id, { ...l, lifeAreaId: '' }))
    deleteLifeArea(id)
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardPage
              tasks={tasks}
              addTask={addTask}
              setStatus={setStatus}
              events={events}
              notifications={notifications}
              unreadCount={unreadCount}
              markRead={markRead}
              lifeAreas={lifeAreas}
            />
          }
        />
        <Route
          path="/tasks"
          element={
            <TasksPage
              tasks={tasks}
              addTask={addTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
              setStatus={setStatus}
              files={files}
              onLinkFile={linkFileToTask}
              onUnlinkFile={unlinkFileFromTask}
              lifeAreas={lifeAreas}
              notes={notes}
              links={links}
            />
          }
        />
        <Route
          path="/calendar"
          element={
            <CalendarPage
              events={events}
              tasks={tasks}
              lifeAreas={lifeAreas}
              addEvent={addEvent}
              updateEvent={updateEvent}
              deleteEvent={deleteEvent}
              files={files}
              notes={notes}
              links={links}
              onLinkFile={linkFileToEvent}
              onUnlinkFile={unlinkFileFromEvent}
            />
          }
        />
        <Route path="/timeline" element={<TimelinePage tasks={tasks} events={events} lifeAreas={lifeAreas} />} />
        <Route
          path="/files"
          element={
            <FilesPage
              files={files}
              loaded={filesLoaded}
              error={filesError}
              clearError={clearFilesError}
              quotaWarning={filesQuotaWarning}
              clearQuotaWarning={clearFilesQuotaWarning}
              tasks={tasks}
              lifeAreas={lifeAreas}
              addFile={addFile}
              deleteFile={deleteFile}
            />
          }
        />
        <Route
          path="/notifications"
          element={
            <NotificationsPage
              notifications={notifications}
              markRead={markRead}
              markAllRead={markAllRead}
              permission={permission}
              requestPermission={requestPermission}
            />
          }
        />
        <Route
          path="/inbox"
          element={
            <InboxPage
              tasks={tasks}
              events={events}
              files={files}
              filesLoaded={filesLoaded}
              notes={notes}
              links={links}
              lifeAreas={lifeAreas}
              updateTask={updateTask}
              deleteTask={deleteTask}
              updateEvent={updateEvent}
              deleteEvent={deleteEvent}
              updateFile={updateFile}
              deleteFile={deleteFile}
              addNote={addNote}
              updateNote={updateNote}
              deleteNote={deleteNote}
              addLink={addLink}
              updateLink={updateLink}
              deleteLink={deleteLink}
            />
          }
        />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route
          path="/life-areas"
          element={
            <LifeAreasPage
              lifeAreas={lifeAreas}
              addLifeArea={addLifeArea}
              updateLifeArea={updateLifeArea}
              deleteLifeArea={handleDeleteLifeArea}
            />
          }
        />
        <Route path="/profile" element={<ProfilePage profile={profile} updateProfile={updateProfile} />} />
      </Routes>

      {/* Sprint 8: ปุ่มกลาง "+ Add to My Today" ต้องกดได้จากทุกหน้า จึงเรนเดอร์ที่ระดับ App
          เดียว (คนละมุมกับปุ่ม "+" เฉพาะหน้าเดิมของแต่ละหน้าที่ยังใช้กรอกฟอร์มเต็มได้ตามปกติ) */}
      <button
        type="button"
        onClick={() => setQuickCaptureOpen(true)}
        aria-label="+ Add to My Today"
        className="fixed bottom-20 left-5 z-10 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-slate-800 active:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
      >
        <span aria-hidden>⚡</span> Add to My Today
      </button>
      <QuickCaptureModal
        open={quickCaptureOpen}
        onClose={() => setQuickCaptureOpen(false)}
        lifeAreas={lifeAreas}
        tasks={tasks}
        addTask={addTask}
        addEvent={addEvent}
        addFile={addFile}
        addNote={addNote}
        addLink={addLink}
      />

      <NavBar unreadCount={unreadCount} inboxCount={inboxCount} />
    </>
  )
}

export default App
