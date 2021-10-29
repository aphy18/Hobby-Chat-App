import { useEffect, useState } from 'react';

import '../styles/MessageList.css';
import MessageOption from '../components/MessageOption';
import axios from 'axios';

export default function MessageList() {
  
  async function getAllUserData() {
    const userData = await axios.get(`http://localhost:8080/messageList`);
    console.log('this is user data ---->', userData)

  }

  useEffect(() => {
    getAllUserData()
    
  }, [])
  

  return (
    <>
    <div className="message-list-container">
      <MessageOption />
    </div>
    </>
  )
}