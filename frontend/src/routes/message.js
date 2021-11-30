import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/Message.css'
import io from 'socket.io-client';
import axios from 'axios'
import useForm from '../customHooks/useForm';

export default function Message() {

  async function request(){
    await axios.get('http://localhost:8080/message/:id')
  }

  useEffect(() => {
    request()
  },[])

  return (
    <div className="master-message-container">
      <div className="message-form-container">
        <form className="message-form">
         <textarea className="input-area" type="text" placeholder="message"></textarea>
         <button className="message-page-button">Send</button>
        </form>
      </div>
    <div className="chat-log">

    </div>
    </div>
  )
}





  
 
  

  
 


   