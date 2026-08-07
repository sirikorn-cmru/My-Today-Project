import { Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { DashboardPage } from './pages/DashboardPage'
import { TasksPage } from './pages/TasksPage'
import { CalendarPage } from './pages/CalendarPage'
import { FilesPage } from './pages/FilesPage'
import { useTasks } from './hooks/useTasks'
import { useEvents } from './hooks/useEvents'
import { useFiles } from './hooks/useFiles'

function App() {
  const { tasks, addTask, updateTask, deleteTask, setStatus } = useTasks()
  const { events, addEvent, updateEvent, deleteEvent } = useEvents()
  const { files, loaded: filesLoaded, addFile, deleteFile, linkFileToTask, unlinkFileFromTask } = useFiles()

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<DashboardPage tasks={tasks} addTask={addTask} setStatus={setStatus} events={events} />}
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
            <FilesPage files={files} loaded={filesLoaded} tasks={tasks} addFile={addFile} deleteFile={deleteFile} />
          }
        />
      </Routes>
      <NavBar />
    </>
  )
}

export default App
