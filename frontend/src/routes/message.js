import React from 'react';
import '../styles/Message.css'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios'
import useForm from '../customHooks/useForm';

export default function Message() {
  return (
    <div className="master-message-container">
      <div className="message-form-container">
        <form className="message-form">
         <input type="text" placeholder="message"></input>
         <button>Send</button>
        </form>
      </div>
    <div className="chat-log">

    </div>
    </div>
  )
}





  
 
  

  
 


   