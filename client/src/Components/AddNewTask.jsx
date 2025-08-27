import React, { useState, useEffect, useContext } from 'react';
import { IoClose } from "react-icons/io5";
import {calculateDaysAgo } from '../Utils/calculateDays'
import { useNavigate } from 'react-router-dom';
import { myContext } from './UserContext';
import { showToast } from './TaskDashboard';
import "../Styles/Tasks.css";


const BASE_URL = 'http://localhost:3000';

const AddNewTask = ({ setIsOpen, setTasks, tasks, buttonName, id }) => {


  const {setToast, currentUser} = useContext(myContext)

 

  
  const [newTask, setNewTask] = useState({
    user: currentUser.user._id,
    title: '',
    description: '',
    priority: 'Low',
    date: '',
    taskCompleted: 'No',
    status: 'In Progress'
  });

  const [errors, setErrors] = useState({});
  

  useEffect(() => {
    if (id != null)
       {
      setNewTask(tasks.find(task => task._id === id));
    }
  }, [id, tasks]);



 
    
  

  const updateTask = async() => {

    const err = {};
    
    if (!newTask.title)
      {
        err.title = 'Title is required';
      }
    if (!newTask.description)
      {
        err.description = 'Description is required';
      }

    if (!newTask.date)
      {
        err.date = 'Due date is required';
      } 
    
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

   
    let response;
    if (buttonName === "Edit Task") {
      response = await fetch(`${BASE_URL}/api/tasks/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
         },
        body: JSON.stringify(newTask)
      });
    } else {
      response = await fetch(`${BASE_URL}/api/tasks/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
         },
        body: JSON.stringify(newTask),
        
      });
    }


   
    if (!response.ok) {
      showToast(setToast,"Failed to update/add task", "error");
      return;
    }

    const data = await response.json();
    
    if (buttonName === "Edit Task") {
      setTasks(tasks.map(task => (task._id === id ? data : task)));
      showToast(setToast,"Task updated successfully", "success");
    } else {
      setTasks([...tasks, data]);
      showToast(setToast,"Task added successfully", "success");
    }

    
    setIsOpen(false);

    const updatedTasksRes = await fetch(`${BASE_URL}/api/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`
      }
    });
  
    const updatedTasks = await updatedTasksRes.json();
    setTasks(updatedTasks);
    setIsOpen(false);
  };

  return (
    <div className="task-form-container">
       <IoClose className="close-icon" onClick={() =>{
            setIsOpen(false)
            setNewTask({
              user: currentUser.user._id,
              title: '',
              description: '',
              priority: 'Low',
              date: '',
              taskCompleted: 'No',
              status: 'In Progress'
            });

       }} />

      <div className='form'>
         

        <label>Title</label>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task Title"
        />
        
        {errors.title && <p className="error">{errors.title}</p>}

        <label>Description</label>
        <textarea
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Task Description"
          className='textArea'
        />
        {errors.description && <p className="error">{errors.description}</p>}

        <label>Select Priority</label>
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label>Due Date</label>
        <input
          type="date"
          value={newTask.date}
          onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
        />
        {errors.date && <p className="error">{errors.date}</p>}

        <label>Task Completed</label>
        <select
          value={newTask.taskCompleted}
          onChange={(e) => {
            const taskCompleted = e.target.value;
            const status = taskCompleted === 'Yes' ? 'Completed' : 
       (calculateDaysAgo(date).includes('days ago') || calculateDaysAgo(date).includes('Yesterday'))
        ? "Overdue"
        : "In Progress"
      
           
            setNewTask({ ...newTask, taskCompleted, status });
          }}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>

        <button onClick={updateTask} className="update-btn">
          {buttonName}
        </button>
      </div>
    </div>
  );
};

export default AddNewTask;
