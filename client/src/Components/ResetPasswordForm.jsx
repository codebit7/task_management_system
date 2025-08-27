import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock, FaArrowLeft } from "react-icons/fa";
import taskLogo from '../assets/taskLogo.png';
import CustomToast from "./CustomToast";
import { showToast } from "./TaskDashboard";
import { myContext } from "./UserContext";
import "../Styles/Auth.css";

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isTokenValid, setIsTokenValid] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { setToast, toast } = useContext(myContext);
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    if (!token) {
      setIsTokenValid(false);
    } else {
      setIsTokenValid(true);
    }
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
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
      const res = await fetch(`http://localhost:3000/api/user/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: formData.newPassword }),
      });
      
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 400) {
          setIsTokenValid(false);
        }
        showToast(setToast, data.message || "Password reset failed", "error");
        setLoading(false);
        return;
      }

      showToast(setToast, "Password reset successful! Redirecting to login...", "success");
      setIsSuccess(true);
      setLoading(false);
      
      setFormData({
        newPassword: "",
        confirmPassword: "",
      });
      
      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (error) {
      console.error("Password reset failed:", error);
      showToast(setToast, "Password reset failed. Please try again.", "error");
    } finally {
      setLoading(false); 
    }
  };

  if (isTokenValid === false) {
    return (
      <>
        {toast && <CustomToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        
        <div className="auth-container">
          <div className="auth-wrapper single-column">
            <div className="auth-form-section centered">
              <div className="success-message">
                <div className="success-icon">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="32" fill="#ef4444" opacity="0.1"/>
                    <circle cx="32" cy="32" r="24" fill="#ef4444" opacity="0.2"/>
                    <path d="M24 24L40 40M40 24L24 40" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </div>
                <h2>Invalid Reset Link</h2>
                <p>This password reset link is invalid or has expired.</p>
                <p className="text-muted">
                  Please request a new password reset link to continue.
                </p>
                
                <div className="action-buttons">
                  <Link to="/forgot-password" className="auth-submit-btn">
                    Request New Reset Link
                  </Link>
                  <Link to="/login" className="secondary-btn">
                    <FaArrowLeft /> Back to Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isSuccess) {
    return (
      <>
        {toast && <CustomToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        
        <div className="auth-container">
          <div className="auth-wrapper single-column">
            <div className="auth-form-section centered">
              <div className="success-message">
                <div className="success-icon">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="32" fill="#28a745" opacity="0.1"/>
                    <circle cx="32" cy="32" r="24" fill="#28a745" opacity="0.2"/>
                    <path d="M20 32L28 40L44 24" stroke="#28a745" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2>Password Reset Successful!</h2>
                <p>Your password has been successfully reset.</p>
                <p className="text-muted">
                  You will be redirected to the login page in a few seconds.
                </p>
                
                <div className="action-buttons">
                  <Link to="/login" className="auth-submit-btn">
                    <FaArrowLeft /> Continue to Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {toast && <CustomToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="auth-container">
        <div className="auth-wrapper single-column">
          <div className="auth-form-section centered">
            <form className="modern-auth-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <img src={taskLogo} alt="TaskManager" className="form-logo" />
                <h2>Reset Password</h2>
                <p>Enter your new password to complete the reset process</p>
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    placeholder="Enter new password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className={errors.newPassword ? 'error-input' : ''}
                  />
                  <button 
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm new password"
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

              <button className="auth-submit-btn" type="submit" disabled={loading}>
                {loading ? (
                  <div className="button-loading">
                    <span className="spinner"></span>
                    Resetting password...
                  </div>
                ) : (
                  "Reset Password"
                )}
              </button>

              <div className="auth-footer">
                <Link to="/login" className="back-link">
                  <FaArrowLeft /> Back to Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;