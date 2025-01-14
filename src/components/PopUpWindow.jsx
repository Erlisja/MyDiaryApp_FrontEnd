import React from 'react'
import { useNavigate } from 'react-router'

function PopUpWindow({message}) {

    const navigate = useNavigate();

const onClose = () => {
    navigate("/login");
}





  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{message}</p>
        <button className="close-popup-btn" onClick={onClose}>OK</button>
      </div>
    </div>
   
  )
}

export default PopUpWindow