import React from 'react'
import '../styles/Popup.css'
import Aos from "aos";
import { useEffect } from 'react';

// make a /setup page

export default function RegisterPopup() {
  return (
      <>
      <div className='pop-up-container'>
      <p>Click <a href="/login">here</a> to login or take a minute to set up the rest of your account <a href='/#'>here</a></p>
      </div>
      </>
    )
}
