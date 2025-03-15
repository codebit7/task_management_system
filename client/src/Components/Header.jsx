import React, { useContext, useState } from 'react'

import { CiDark } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { myContext } from './UserContext';
import taskLogo from '../assets/taskLogo.png';



const Header = ({setIsOpen,setButtonName, taskCount}) => {

 const {currentUser,setProfileOpen} =  useContext(myContext);
 
  
  const AddTask = () => {
    setButtonName("Create new Task")
    setIsOpen(true);
  }
 
  return (
  
    
    <div className="header">
      <div className='header_left'>
       <img src ={taskLogo} className='logo'/>
       <div className='title'>
         <h2 className="welcome-text">Welcome,{currentUser?.user?.name}</h2>
         <p className="task-count">You have {taskCount} tasks to complete</p>
      </div>
      </div>

      <div className='header_right'>
      <button className="add-task-btn" onClick={()=>{AddTask()}}>Add a New Task</button>

      <div className='header_item_icons'>
           {/* <div className='icons'>
                <CiDark/> 
           </div> */}

           <div className='icons'>
               <IoPerson onClick ={()=>setProfileOpen(true)}/>
           </div>
      </div>

      </div>
    </div>
    
  )
}

export default Header
