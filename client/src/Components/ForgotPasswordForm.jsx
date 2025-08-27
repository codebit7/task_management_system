import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import taskLogo from '../assets/taskLogo.png';
import CustomToast from "./CustomToast";
import { showToast } from "./TaskDashboard";
import { myContext } from "./UserContext";
import "../Styles/Auth.css";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { setToast, toast } = useContext(myContext);

  const handleChange = (e) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors({ ...errors, email: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
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
      const res = await fetch("http://localhost:3000/api/user/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();

      if (!res.ok) {
        showToast(setToast, data.message || "Failed to send reset email", "error");
        setLoading(false);
        return;
      }

      showToast(setToast, "Password reset link sent to your email!", "success");
      setIsEmailSent(true);
      setLoading(false);

    } catch (error) {
      console.error("Forgot password failed:", error);
      showToast(setToast, "Failed to send reset email. Please try again.", "error");
    } finally {
      setLoading(false); 
    }
  };

  if (isEmailSent) {
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
                <h2>Check Your Email</h2>
                <p>We've sent a password reset link to <strong>{email}</strong></p>
                <p className="text-muted">
                  Didn't receive the email? Check your spam folder or try again with a different email address.
                </p>
                
                <div className="action-buttons">
                  <Link to="/login" className="auth-submit-btn">
                    <FaArrowLeft /> Back to Sign In
                  </Link>
                  <button 
                    className="secondary-btn" 
                    onClick={() => {
                      setIsEmailSent(false);
                      setEmail("");
                    }}
                  >
                    Try Different Email
                  </button>
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
                <h2>Forgot Password?</h2>
                <p>No worries! Enter your email address and we'll send you a reset link</p>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={handleChange}
                    className={errors.email ? 'error-input' : ''}
                  />
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <button className="auth-submit-btn" type="submit" disabled={loading}>
                {loading ? (
                  <div className="button-loading">
                    <span className="spinner"></span>
                    Sending reset link...
                  </div>
                ) : (
                  "Send Reset Link"
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

export default ForgotPasswordForm;