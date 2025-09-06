import React, { useEffect, useState } from 'react'
import TaskCard from './TaskCard';
import { TaskListSkeleton } from './ShimmerLoader';

import "../Styles/Tasks.css";
import "../Styles/Shimmer.css";

const TaskList = ({ setIsOpen, setButtonName, setTasks, tasks, setId, statusTitle, isLoading }) => {

  const filters = ['All', 'Low', 'Medium', 'High'];
  const [filter, setFilter] = useState('All');

  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    if (filter === 'All') 
      {
      setFilteredTasks(tasks);
    } 
    else
       {
      setFilteredTasks(tasks.filter(task => task.priority.toLowerCase() === filter.toLowerCase()));
    }
  }, [filter, tasks]);

  const AddTask = () => {
    setIsOpen(true);
    setButtonName("Create new Task");
  }

 
  if (isLoading) 
    {
    return <TaskListSkeleton />;
  }

  return (
    <>
      <div className='task_list_header'>
        <h1>{`${statusTitle} Tasks`}</h1>
        <div className="task_filters">
          <ul>
            
            {filters.map((f) => (
             <li key={f} onClick={() => setFilter(f)} 
                   className={filter === f ? 'active' : ''}>
                  {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
   
      <div className="task-list">

        {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
             
             <TaskCard
              key={task._id}
              setIsOpen={setIsOpen} 
              setButtonName={setButtonName}
              setTasks={setTasks}
              setId={setId}
              task={task}

            />
          ))
        ) : (
         <div className="no-tasks-message">
            <p>No tasks found for the selected filter.</p>
          </div>
        )}
        <div className="add-task" onClick={AddTask}>Add New Task</div>
      </div>
    </>
  )
}

export default TaskList