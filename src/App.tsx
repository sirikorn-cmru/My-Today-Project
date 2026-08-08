import { Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { DashboardPage } from './pages/DashboardPage'
import { TasksPage } from './pages/TasksPage'
import { CalendarPage } from './pages/CalendarPage'
import { FilesPage } from './pages/FilesPage'
import { NotificationsPage } from './pages/NotificationsPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { LifeAreasPage } from './pages/LifeAreasPage'
import { ProfilePage } from './pages/ProfilePage'
import { useTasks } from './hooks/useTasks'
import { useEvents } from './hooks/useEvents'
import { useFiles } from './hooks/useFiles'
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
    addFile,
    deleteFile,
    linkFileToTask,
    unlinkFileFromTask,
    updateFileLifeArea,
  } = useFiles()
  const { notifications, unreadCount, markRead, markAllRead, permission, requestPermission } = useNotifications(
    tasks,
    events,
  )
  const { lifeAreas, addLifeArea, updateLifeArea, deleteLifeArea } = useLifeAreas()
  const { profile, updateProfile } = useProfile()

  // Deleting a Life Area must not delete the Tasks/Events/Files that referenced it — they
  // stay, just with no Life Area anymore (Sprint 7 Acceptance Criteria). Clear the stale
  // reference on every record that pointed at it before removing the Life Area itself.
  function handleDeleteLifeArea(id: string) {
    tasks.filter((t) => t.lifeAreaId === id).forEach((t) => updateTask(t.id, { ...t, lifeAreaId: '' }))
    events.filter((e) => e.lifeAreaId === id).forEach((e) => updateEvent(e.id, { ...e, lifeAreaId: '' }))
    files.filter((f) => f.lifeAreaId === id).forEach((f) => updateFileLifeArea(f.id, ''))
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
            />
          }
        />
        <Route
          path="/files"
          element={
            <FilesPage
              files={files}
              loaded={filesLoaded}
              error={filesError}
              clearError={clearFilesError}
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
      <NavBar unreadCount={unreadCount} />
    </>
  )
}

export default App
