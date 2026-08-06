import { Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { DashboardPage } from './pages/DashboardPage'
import { TasksPage } from './pages/TasksPage'
import { CalendarPage } from './pages/CalendarPage'
import { useTasks } from './hooks/useTasks'
import { useEvents } from './hooks/useEvents'

function App() {
  const { tasks, addTask, updateTask, deleteTask, setStatus } = useTasks()
  const { events, addEvent, updateEvent, deleteEvent } = useEvents()

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
      </Routes>
      <NavBar />
    </>
  )
}

export default App
