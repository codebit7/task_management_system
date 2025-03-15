import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });


  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
   
    setLoading(true);
    try {
      
    
      const res = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      const data = await res.json();
      console.log("Data:", data);

      setLoading(false);
      navigate("/login");

    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="form_heading ">Register for an Account</h2>
        <p className=".form_para">
          Create an account. Already have an account?{" "}
          <a href="/login" className="login-link">
            Login here
          </a>
        </p>
        
        
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          required
        />

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
            type="password"
            name="password"
            placeholder="************"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span className="eye-icon">👁️</span>
        </div>

        <button className="authBtn" type="submit" disabled={loading}>
          {loading ? <span className="loader"></span> : "Register Now"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
