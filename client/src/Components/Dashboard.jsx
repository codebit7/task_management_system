import React, { useContext } from 'react';
import TaskCompletionChart from './TaskCompletionChart';
import { myContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import profile from './../assets/profile.png'
import "../Styles/Dashboard.css";

const Dashboard = ({ tasks}) => {

  const {currentUser, setCurrentUser, setIsLogin,setProfileOpen} = useContext(myContext);
  const total = tasks.length;

  const inProgress = tasks.filter(task => task.status === 'In Progress').length;

  const overDue = tasks.filter(task => task.status === 'Overdue').length;
  const completed= tasks.filter(task => task.status === 'Completed').length;
  
  const navigate = useNavigate()
  
  

  const handleLogout = () => {
    setIsLogin(false);
    setCurrentUser({
       user:
        { name: "", email: "", id: "" }, 
        token: null });
  
   
    localStorage.removeItem("user");
    localStorage.removeItem("isLogin");
  
    navigate("/login");
  };




  const handleProfile = () => {
    setProfileOpen(true);
  };

  return (
    <div className="dashboard">

      <div className='profile' onClick={handleProfile}>
        <div className='p_pic'>
          <img src={profile} alt="" />
        </div>
        <h3 className='p_title'>Hello,<br /><span>{currentUser?.user?.name}</span></h3>
      </div>

      <div className='task_history'>
        <div className='tasks'>
          <h3>Total tasks:</h3>
          <div className='count'>
            <div className='dundi1'></div>
            <h2>{total}</h2>
          </div>
        </div>

        <div className='tasks'>
          <h3>InProgress:</h3>
          <div className='count'>
            <div className='dundi2'></div>
            <h2>{inProgress}</h2>
          </div>
        </div>

        <div className='tasks'>
          <h3>OverDue:</h3>
          <div className='count'>
            <div className='dundi3'></div>
            <h2>{overDue}</h2>
          </div>
        </div>

        <div className='tasks'>
          <h3>Completed:</h3>
          <div className='count'>
            <div className='dundi4'></div>
            <h2>{completed}</h2>
          </div>
        </div>
      </div>

      
        <div className='task_chart'>
        <h4 className='activity-title'>Activity</h4>
           <TaskCompletionChart
             totalTasks={total}
             pendingTasks={inProgress}
             completedTasks={completed}
             overdueTasks={overDue}
           />
    </div>

      <button className='logoutBtn' onClick={handleLogout}>Logout</button>
    </div>
  );
}



export default Dashboard;
