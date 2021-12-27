import React from 'react'
import '../styles/Popup.css'
import Aos from "aos";
import { useEffect } from 'react';

export default function LoginPopup(props) {

  useEffect(() => {
    Aos.init({duration: 600})
  })


    return (props.trigger) ? (
      <div className='pop-up-container' data-aos="zoom-in">
        <button className='pop-up-button' onClick={() => props.setTrigger(false)}>Close</button>
        <p>You have logged in! Click <a href="/">here</a> to go to home page</p>
      </div>
    ) : ""
  
  
}
