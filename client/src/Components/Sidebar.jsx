import React , {useEffect, useState}from 'react'

import { RxDashboard } from "react-icons/rx";
import { MdTaskAlt } from "react-icons/md";
import { LuTimerOff } from "react-icons/lu";
import { RiProgress1Line } from "react-icons/ri";
import "../Styles/Dashboard.css";

const Sidebar = ({setStatusFilterOnTask,tasks, setStatusTitle}) => {

  const items = [

    {
      icon: <RxDashboard/>,
      name: 'All'
    },
    {
      icon: <MdTaskAlt/>,
      name: 'Completed'
    },

    {
      icon: <RiProgress1Line/>,
      name: 'In Progress'
    },

    {
      icon: <LuTimerOff/>,
      name: 'Overdue'
    }
    
  ]
  
  useEffect(() => {

       setActiveIndex(0);
       setStatusFilterOnTask(tasks);
       setStatusTitle('All');

}, [tasks]);
  
  const [activeIndex, setActiveIndex] = useState(0);


 


    const ItemClicked = (index, name) => {
      setActiveIndex(index);
      if (name === 'All')
         {
        setStatusFilterOnTask(tasks);
        setStatusTitle('All');
      }
       else if (name === 'Completed')
         {
        setStatusFilterOnTask(tasks.filter(task => task.status === 'Completed'));
        setStatusTitle('Completed');
      }
       else if (name === 'In Progress')
         {
        setStatusFilterOnTask(tasks.filter(task => task.status === 'In Progress'));
        setStatusTitle('In Progress');
      } 
      else if (name === 'Overdue')
         {
        setStatusFilterOnTask(tasks.filter(task => task.status === 'Overdue'));
        setStatusTitle('Overdue');
      }
    };
    
  



  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        {
          items.map((item, index) => {
            return (
              <li
                key={index}
                className={`sidebar_icons ${index === activeIndex ? 'item_active' : ''}`}
                onClick={() => ItemClicked(index,item.name)}
                title={item.name}
              >
                {item.icon}
              </li>
            )
          })
        }
       
      </ul>
    </div>
  )
}

export default Sidebar
