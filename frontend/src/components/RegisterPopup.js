import React from 'react'
import '../styles/Popup.css'
import Aos from "aos";
import { useEffect } from 'react';

// make a /setup page

export default function RegisterPopup() {

  useEffect(() => {
    Aos.init({duration: 500})
  })


  return (
      <>
      <div className='registration-hobby-container' data-aos='zoom-in'>
        
      </div>
      </>
    )
}
