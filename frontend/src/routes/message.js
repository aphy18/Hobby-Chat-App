import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/Message.css'
import io from 'socket.io-client';
import axios from 'axios'
import useForm from '../customHooks/useForm';

export default function Message() {

  const { values, setValues, handleChange, handleSubmit } = useForm(sendMessage)
  const arr = [];
  const [data,setData] = useState([]);
  const splitPathName = parseInt(window.location.pathname.split('/')[2]);
  let userObj = JSON.parse(localStorage.getItem('user'))
  console.log('SPLIT PATH -->',splitPathName);

  async function request(){
    const getFriendData = await axios.get('http://localhost:8080/message')
    setData(getFriendData.data)
  }

  useEffect(() => {
    request()
  },[])

  console.log('data',data)

  data.map(obj => {
    if (obj.username === userObj.username && obj.receiver_id === splitPathName) {
      arr.push(obj)
    }
  })

  console.log('arr 37 -->',arr)

  function sendMessage(){

  }

  return (
    <div className="master-message-container">
      <div className="message-form-container">
        <form className="message-form">
         <textarea name="mesaage" value={values.message} className="input-area" type="text" placeholder="message"></textarea>
         <button className="message-page-button" onClick={handleSubmit}>Send</button>
        </form>
      </div>
    <div className="chat-log">

    </div>
    </div>
  )
}





  
 
  

  
 


   