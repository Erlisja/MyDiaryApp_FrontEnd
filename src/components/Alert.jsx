import React from "react";


const Alert = ({ message, type, onClose }) => {
  if (!message) return null; // Do not render if no message is passed

  return (
    <div className={`alert alert-${type}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>
        ✖
      </button>
    </div>
  );
};

export default Alert;
