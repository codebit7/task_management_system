import React, { useContext, useState } from "react";
import profile from './../assets/profile.png'
import { myContext } from "./UserContext";
import { showToast } from "./TaskDashboard";
import "../Styles/Modal.css";


const UserProfile = () => {
  const {setProfileOpen,currentUser, setCurrentUser,setToast} = useContext(myContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [name, setName] = useState(currentUser?.user?.name ||"");


  




  const handleSaveChanges = async () => {
    if (name.trim() === "") {
      alert("Please fill all the fields");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:3000/api/user/update", {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({ id: currentUser.user._id, name }),
      });
  
      const data = await res.json(); 
  
      if (!res.ok) {
        showToast(setToast,"Something went wrong", "error");
        return;
      }
  
      showToast(setToast,"Profile Updated Successfully", "success");
  
      setProfileOpen(false);
      setCurrentUser({ ...currentUser, user: data.user });
  
    } catch (error) {
      showToast(setToast,"Something went wrong", "error");
      
    }
  };
  

  const handleChangePassword = async() => {

  

    if(oldPassword === "" || newPassword === "")
    {
      showToast(setToast,"Please fill Old and New Password", error);
      return;
    }

    const res = await fetch("http://localhost:3000/api/user/change-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.token}`,
      },
      body: JSON.stringify({id:currentUser.user._id, oldPassword, newPassword }),
    });


    if(res.status === 200)
    {
     showToast(setToast,"Password Changed Successfully", "success");
      setOldPassword("");
      setNewPassword("");
      setProfileOpen(false);
    }
    else
    {
      const data = await res.json();
      showToast(setToast,data.message, "error");
    }



  };


  




  return (
    <div className="modal">
      <div className="modal-content">
        <div className="profile-header">
          <img src={profile}
            className="profile-img"
            />
          
          <div className="profile-info">
            <h3>{currentUser.user.name}</h3>
            <p>{currentUser.user.email}</p>
          </div>
          <div className="profile-actions">
           
            <span className="verified-badge"> Verified</span>
          </div>
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" value={currentUser.user.email} disabled />
        </div>

        <div className="password-group">
          <div className="form-group">
            <label>Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        <button className="change-password-btn" onClick={handleChangePassword}>
          Change Password
        </button>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={()=>setProfileOpen(false)}>Cancel</button>
          <button className="save-btn" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

