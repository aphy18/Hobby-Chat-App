import '../styles/Message.css'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios'
import useForm from '../customHooks/useForm';


export default function Message(){
  const { values, handleChange, handleSubmit } = useForm(submitMessage)

  async function getUserData() {
    const userData = await axios.get(`http://localhost:8080/message/:id`);
    console.log('this is user data ---->', userData.data)

   
  }

  function submitMessage(){
    console.log('message submitted')
  }

  useEffect(() => {
    getUserData()
  },[])

  
  return (
    <div className="master-message-container">
     <form className="message-form" onSubmit={handleSubmit}>
       <input type="text" name="message" value={values.message}></input>
       <button>Send Message</button>
     </form>
    </div>
  )
}