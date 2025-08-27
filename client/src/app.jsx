import './newapp.css'
import TaskDashboard from './Components/TaskDashboard.jsx'
import LoginForm from './Components/LoginForm.jsx'
import RegisterForm from './Components/RegisterForm.jsx'
import ForgotPasswordForm from './Components/ForgotPasswordForm.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Protect from './Components/protect.jsx'
import ContextProvider, { myContext } from './Components/UserContext.jsx'
import ResetPasswordForm from './Components/ResetPasswordForm.jsx'

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
    <Route path="/forgot-password" element={<ForgotPasswordForm />} />
    <Route path="/reset-password/:token" element={<ResetPasswordForm />} />

   
  </Routes>
  </Router>

  </ContextProvider>
  )
}