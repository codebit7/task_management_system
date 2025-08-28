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
import { SidebarSkeleton, DashboardSkeleton } from "./ShimmerLoader";

const BASE_URL = "https://task-management-system-11q6.vercel.app";

export const showToast = (setToast, message, type) => {
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
  const [isLoading, setIsLoading] = useState(true);

  const { currentUser, profileOpen, toast, setToast } = useContext(myContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!currentUser || !currentUser.token) {
        navigate('/login');
        return;
      }

      setIsLoading(true);
      
      try {
        const response = await fetch(`${BASE_URL}/api/tasks`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.token}` 
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            navigate('/login');
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();
        
        if (!Array.isArray(data)) {
          console.warn("Expected array but got:", typeof data);
          setTasks([]);
          setStatusFilterOnTask([]);
          return;
        }

        console.log("MY TASKS", data);
        setTasks(data);
        setStatusFilterOnTask(data);
        
      } catch (error) {
        console.error("Error fetching tasks:", error);
        showToast(setToast, "Error fetching tasks. Please try again.", "error");
        setTasks([]);
        setStatusFilterOnTask([]);
      } finally {
       
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    fetchTasks();
  }, [currentUser, navigate]);

  return (
    <div className="dashboard-container">
      {toast && <CustomToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
  
      <Header
        setIsOpen={setIsOpen}
        setButtonName={setButtonName}
        taskCount={isLoading ? 0 : tasks.filter((task) => task.status !== "Completed").length}
        isLoading={isLoading}
      />

      <div className="main_content">
        {isLoading ? (
          <SidebarSkeleton />
        ) : (
          <Sidebar
            setStatusFilterOnTask={setStatusFilterOnTask}
            tasks={tasks}
            setStatusTitle={setStatusTitle}
          />
        )}

        <div className="task-container">
          <TaskList
            setIsOpen={setIsOpen}
            setButtonName={setButtonName}
            tasks={statusFilterOnTask}
            setTasks={setTasks}
            setId={setId}
            statusTitle={statusTitle}
            isLoading={isLoading}
          />
        </div>

        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <Dashboard tasks={tasks} />
        )}
      </div>

      {isOpen && (
        <AddNewTask
          setIsOpen={setIsOpen}
          setTasks={setTasks}
          buttonName={buttonName}
          id={id}
          tasks={tasks}
          userId={currentUser.user.id}
        />
      )}

      {profileOpen && <UserProfile />}
    </div>
  );
};

export default TaskDashboard;