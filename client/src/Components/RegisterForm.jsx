import React, { useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { MdElectricBolt,MdOutlineAnalytics } from "react-icons/md";
import { IoMdRocket } from "react-icons/io";
import taskLogo from '../assets/taskLogo.png';
import CustomToast from "./CustomToast";
import { showToast } from "./TaskDashboard";
import { myContext } from "./UserContext";
import "../Styles/Auth.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { setToast, toast } = useContext(myContext);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
   

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name)
       {
      newErrors.name = "Full name is required";
    }
     else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email)
       {
      newErrors.email = "Email is required";
    } 
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password)
       {
      newErrors.password = "Password is required";
    } 
    else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!formData.confirmPassword)
       {
      newErrors.confirmPassword = "Please confirm your password";
    } 
    else if (formData.password !== formData.confirmPassword)
       {
      newErrors.confirmPassword = "Passwords do not match";
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
      const res = await fetch("https://task-management-system-11q6.vercel.app/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
        credentials: 'include'
      });
      
      const data = await res.json();

      if (!res.ok) {
        showToast(setToast, data.message || "Registration failed", "error");
        setLoading(false);
        return;
      }

      showToast(setToast, "Registration successful! Please login to continue.", "success");
      setLoading(false);
      
     
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      
     
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      console.error("Registration failed:", error);
      showToast(setToast, "Registration failed. Please try again.", "error");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      {toast && <CustomToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="auth-container">
        <div className="auth-wrapper">
         
          <div className="auth-branding register-bg">
            <div className="brand-content">
              <img src={taskLogo} alt="TaskManager" className="brand-logo" />
              <h2>Join TaskMate</h2>
              <p>Create your account and start organizing your tasks like a pro</p>
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon"><IoMdRocket/></div>
                  <span>Get started in minutes</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon"><MdOutlineAnalytics/></div>
                  <span>Track your productivity</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon"><MdElectricBolt/></div>
                  <span>Boost your efficiency</span>
                </div>
              </div>
            </div>
          </div>

          
          <div className="auth-form-section">
            <form className="modern-auth-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <h2>Create Account</h2>
                <p>Fill in your information to get started</p>
              </div>

              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error-input' : ''}
                  />
                </div>
                {errors.name && <span className="error-message">{errors.name}</span>}
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

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Create password"
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

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? 'error-input' : ''}
                    />
                    <button 
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
              </div>

              <button className="auth-submit-btn" type="submit" disabled={loading}>
                {loading ? (
                  <div className="button-loading">
                    <span className="spinner"></span>
                    Creating account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>

              <div className="auth-footer">
                <p>Already have an account? <Link to="/login" className="auth-link">Sign in here</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;