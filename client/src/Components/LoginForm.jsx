import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myContext } from "./UserContext";
import CustomToast from "./CustomToast";
import { showToast } from "./TaskDashboard";





const LoginForm = () => {

 const {setCurrentUser,setIsLogin, setToast,toast} =  useContext(myContext);
 const [showPassword, setShowPassword] = useState(false);




  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      
     const res = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
      });

      const data = await res.json();


      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("isLogin", JSON.stringify(true));
  
      if(res.status !== 200)
      {
        showToast(setToast, data.message, "error");
        setLoading(false);
        return;
      }

      showToast(setToast, "Login Successfull", "success");
      setLoading(false);
      setIsLogin(true);
      setCurrentUser(data);


      navigate('/' , {replace: true});




    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
    {toast && <CustomToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
 
    <div className="login-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="form_heading">Login to Your Account</h2>
        <p className="form_para">
          Login Now. Don’t have an account?{" "}
          <a href="/register" className="login-link">
            Register here
          </a>
        </p>

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="johndoe@gmail.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="************"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span className="eye-icon" onClick={()=>setShowPassword(!showPassword)}>👁️</span>
        </div>

        <a href="/forgot-password" className="forgot-link">
          Forgot password?
        </a>

        <button className="authBtn" type="submit" disabled={loading}>
          {loading ? <span className="loader"></span> : "Login Now"}
        </button>
      </form>
    </div>
    </>
  );
};

export default LoginForm;
