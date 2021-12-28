import React from 'react'
import '../styles/Popup.css'
import Aos from "aos";
import { useEffect } from 'react';

export default function LoginPopup() {

  useEffect(() => {
    Aos.init({duration: 500})
  })
    
  return (
      <div className='pop-up-container' data-aos="zoom-in">
        <p className='logged-in'>You have logged in! Click <a href="/">here</a> to go to home page</p>
      </div>
    )
}
