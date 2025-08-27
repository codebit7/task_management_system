import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import TaskList from "./TaskList";
import Dashboard from "./Dashboard";
import AddNewTask from "./AddNewTask";
import { myContext } from "./UserContext";
import UserProfile from "./UserProfile";
import CustomToast from "./CustomToast";

const BASE_URL = "https://task-management-system-11q6.vercel.app";


 export const showToast = (setToast , message, type) => {
 
  setToast({ message, type });
  setTimeout(() => setToast(null), 3000);
};

const TaskDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonName, setButtonName] = useState("Create new Task");
  const [id, setId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [statusTitle, setStatusTitle] = useState("All");
  const [statusFilterOnTask, setStatusFilterOnTask] = useState([]);


  const {currentUser, profileOpen,toast,setToast} = useContext(myContext);
  const navigate = useNavigate();


  console.log("ProfileOpen: ", profileOpen);
  
  useEffect(() => {
    const fetchTasks = async () => {
      if(!currentUser)
      {
        navigate('/login');
        return
      }

      try {
        const response = await fetch(`${BASE_URL}/api/tasks`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.token}` 
          }
        });

      
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);


  

  return (
    <div className="dashboard-container">

{toast && <CustomToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
  
      <Header
        setIsOpen={setIsOpen}
        setButtonName={setButtonName}
        taskCount={tasks.filter((task) => task.status !== "Completed").length}
      />

      <div className="main_content">
        <Sidebar
          setStatusFilterOnTask={setStatusFilterOnTask}
          tasks={tasks}
          setStatusTitle={setStatusTitle}
        />

        <div className="task-container">
          <TaskList
            setIsOpen={setIsOpen}
            setButtonName={setButtonName}
            tasks={statusFilterOnTask}
            setTasks={setTasks}
            setId={setId}
            statusTitle={statusTitle}
          />
        </div>

        <Dashboard tasks={tasks} />
      </div>

      {isOpen && (
        <AddNewTask
          setIsOpen={setIsOpen}
          setTasks={setTasks}
          buttonName={buttonName}
          id={id}
          tasks={tasks}
          userId = {currentUser.user.id}
        />
      )}


 
      {profileOpen && <UserProfile />}
       
    
    </div>
  );
};

export default TaskDashboard;
