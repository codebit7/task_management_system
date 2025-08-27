import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { myContext } from "./UserContext";
import CustomToast from "./CustomToast";
import { showToast } from "./TaskDashboard";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import taskLogo from '../assets/taskLogo.png';
import "../Styles/Auth.css";

const LoginForm = () => {

 const {setCurrentUser,setIsLogin, setToast,toast} =  useContext(myContext);
 const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
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

      if(res.status !== 200) {
        showToast(setToast, data.message, "error");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("isLogin", JSON.stringify(true));

      showToast(setToast, "Login Successful", "success");
      setLoading(false);
      setIsLogin(true);
      setCurrentUser(data);

      navigate('/' , {replace: true});

    } catch (error) {
      console.error("Login failed:", error);
      showToast(setToast, "Login failed. Please try again.", "error");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      {toast && <CustomToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="auth-container">
        <div className="auth-wrapper">
         
          <div className="auth-branding login-bg">
            <div className="brand-content">
              <img src={taskLogo} alt="TaskManager" className="brand-logo" />
              <h2>Welcome Back</h2>
              <p>Sign in to your account to continue managing your tasks efficiently</p>
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon"><MdOutlineDone/></div>
                  <span>Track your daily tasks</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon"><MdOutlineDone/></div>
                  <span>Set priorities & deadlines</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon"><MdOutlineDone/></div>
                  <span>Monitor your progress</span>
                </div>
              </div>
            </div>
          </div>

      
          <div className="auth-form-section">
            <form className="modern-auth-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <h2>Sign In</h2>
                <p>Enter your credentials to access your account</p>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error-input' : ''}
                  />
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'error-input' : ''}
                  />
                  <button 
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-options">
                <Link to="/forgot-password" className="forgot-password-link">
                  Forgot your password?
                </Link>
              </div>

              <button className="auth-submit-btn" type="submit" disabled={loading}>
                {loading ? (
                  <div className="button-loading">
                    <span className="spinner"></span>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="auth-footer">
                <p>Don't have an account? <Link to="/register" className="auth-link">Sign up here</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;