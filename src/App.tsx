import { Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { DashboardPage } from './pages/DashboardPage'
import { TasksPage } from './pages/TasksPage'
import { CalendarPage } from './pages/CalendarPage'
import { FilesPage } from './pages/FilesPage'
import { NotificationsPage } from './pages/NotificationsPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { useTasks } from './hooks/useTasks'
import { useEvents } from './hooks/useEvents'
import { useFiles } from './hooks/useFiles'
import { useNotifications } from './hooks/useNotifications'

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
  } = useFiles()
  const { notifications, unreadCount, markRead, markAllRead, permission, requestPermission } = useNotifications(
    tasks,
    events,
  )

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
            />
          }
        />
        <Route
          path="/calendar"
          element={
            <CalendarPage
              events={events}
              tasks={tasks}
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
      </Routes>
      <NavBar unreadCount={unreadCount} />
    </>
  )
}

export default App
