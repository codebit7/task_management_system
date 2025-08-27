import React ,{useContext}from 'react'

import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { SiGoogletasks } from "react-icons/si";
import {calculateDaysAgo } from '../Utils/calculateDays'
import { myContext } from './UserContext';
import { showToast } from './TaskDashboard';
import "../Styles/Tasks.css";


const BASE_URL = 'http://localhost:3000';

const TaskCard = ({ setIsOpen ,setButtonName,setTasks, setId,task}) => {

  const {currentUser, setToast} = useContext(myContext);




 const  EditTask = () => {
    

    setId(task._id);
    setIsOpen(true);
    setButtonName("Edit Task");
    console.log('Edit task');
  }

  const RemoveTask = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;

    try {
        const response = await fetch(`${BASE_URL}/api/tasks/delete/${task._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.token}`
            },
           
        });

        const data = await response.json();

        if (!response.ok) {
            showToast(setToast,"Failed To delete task", "error");
            return;
        }

        if (Array.isArray(data.tasks)) {
            showToast(setToast,"Task deleted successfully", "success");
            setTasks(data.tasks);
        } else {
            console.error("Invalid response format:", data);
        }

    } catch (error) {
        console.error("Error deleting task:", error.message);
    }
};


  const daysAgo = calculateDaysAgo(task.date);





const CompleteTask = async () => {

    
    const mytask = {
        _id: task._id,
        user: task.user,
        title: task.title,
        description :task.description,
        date: task.date,
        priority: task.priority,
        taskCompleted: task.taskCompleted === 'Yes' ? 'No': 'Yes',
        status: task.status === 'Completed' ? 
       (calculateDaysAgo(task.date).includes('days ago') || calculateDaysAgo(task.date).includes('Yesterday'))
        ? "Overdue"
        : "In Progress"
         : 'Completed',
    };




      

    const response = await fetch(`${BASE_URL}/api/tasks/update/${task._id}`, {


        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        },
        body: JSON.stringify(mytask)
      });

      if (!response.ok) {

        showToast(setToast,'Failed to update task', 'error');
        throw new Error('Failed to update task');
        
      }

      const data = await response.json();

      showToast(setToast,'Task updated successfully', 'success');
      setTasks(data);

    }


  return (


  <div className="task-card">
    <div className="task_header">
       <div className='task-title'>
       <h3 className="task-title">{task.title}</h3>
       <div className={`${task.status ==='Completed'? "task_complete": "not_complete"}`}  
       onClick={CompleteTask}
       title='Click to Complete'
       >
          <SiGoogletasks className='complete_icon' />
        </div>  
    </div>
       <p className="task-desc">{task.description}</p>
    </div>
    <div className='task_card_footer'>
      <span className="task-date">{daysAgo}</span>
      <span className={`priority-${task.priority}`}>{task.priority}</span>
      

      <div className='update_task'>
      <FaRegEdit  className='edit_task'  title= { "Edit Task"} onClick={()=>{EditTask()}}/>
      <MdDelete className='delete_task' title= { "Remove Task"} onClick={()=>{RemoveTask()}} />
      
      </div>

    
    </div>
  </div>
  )
}

export default TaskCard
