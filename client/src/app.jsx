
import './app.css'
import TaskDashboard from './Components/TaskDashboard'
import LoginForm from './Components/LoginForm'
import RegisterForm from './Components/RegisterForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Protect from './Components/protect'
import ContextProvider, { myContext } from './Components/UserContext'

export function App() {
  
  return (
<ContextProvider>
  <Router>
  <Routes>
    
    <Route path="/" element={
      <Protect >
          <TaskDashboard/>
      </Protect>} />
    <Route path="/login" element={<LoginForm/>} />
    <Route path="/register" element={<RegisterForm />} />

   
  </Routes>
  </Router>

  </ContextProvider>
  )
}


