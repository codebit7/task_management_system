import React from "react";
import "../Styles/Modal.css";

const CustomToast = ({ message, type, onClose }) => {
  return (
    <div className={`toast-container ${type}`}>
      <div className="toast-content">
        <span>{message}</span>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default CustomToast;
