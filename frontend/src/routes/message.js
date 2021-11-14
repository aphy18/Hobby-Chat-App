import React from 'react';
import { ReactDOM } from 'react';
import '../styles/Message.css'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios'
import useForm from '../customHooks/useForm';
import DM from '../components/DM'


// make a new state when u get back to set state of values on submit

export default function Message(){
  const userObj = JSON.parse(localStorage.getItem('user'));
  const { values, setValues, handleChange, handleSubmit } = useForm(postUserMessage)
  const arr = []
  const storeMessages = []
  const splitPathName = parseInt(window.location.pathname.split('/')[2])
  const socket = io('http://localhost:8080')

  // states
  const [nonLoggedInUsers,SetNonLoggedInUsers] = useState({});
  const [state,setState] = useState([]);
  const [render,setRender] = useState(false);
  const [submit, setSubmit] = useState(false);
  
  async function getUserData() {
    const userData = await axios.get(`http://localhost:8080/message/${splitPathName}`);
    console.log('userdata 25',userData)
    SetNonLoggedInUsers(userData.data[userData.data.length - 1].receiver_id)
    for (let user in nonLoggedInUsers) {
      if (!isNaN(nonLoggedInUsers[user])) {
        arr.push(parseInt(nonLoggedInUsers[user]))
      }
    }
    setState(arr)
    setRender(true)
  }

  function postUserMessage() {
    axios.post(`http://localhost:8080/message/${splitPathName}`, { userObj, values });
    const messageObj = { name: userObj.username, message: values.message }
    socket.emit('message', messageObj);
    setValues({})
  }

  socket.on('message',(res) => {
      console.log('message received',res)
  }) 

  useEffect(() => {
    getUserData()
  },[render])

  const mapOverId = state.map((userID) => {
    if (userID === splitPathName) {
      return (
        <div className="master-message-container">
          <form className="message-form" onSubmit={handleSubmit}>
           <textarea type="text" className="input-area" name="message" value={values.message} onChange={handleChange}></textarea>
          <button className="message-page-button">Send Message</button>
         </form>
         <div className="chat-log">
        
         </div>
      </div>
      )
    }
})

return (
  <>
  {mapOverId}
  </>
 )
}


  
 
  

  
 


   