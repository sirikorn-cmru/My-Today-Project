import { Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { DashboardPage } from './pages/DashboardPage'
import { TasksPage } from './pages/TasksPage'
import { useTasks } from './hooks/useTasks'

function App() {
  const { tasks, addTask, updateTask, deleteTask, setStatus } = useTasks()

  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage tasks={tasks} addTask={addTask} setStatus={setStatus} />} />
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
      </Routes>
      <NavBar />
    </>
  )
}

export default App
