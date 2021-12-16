import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/Message.css'
import io from 'socket.io-client';
import axios from 'axios'
import useForm from '../customHooks/useForm';
import PulseLoader from "react-spinners/PulseLoader";

export default function Message() {

  const socket = io('http://localhost:8080')
    socket.on('connection', () => {
       console.log('connected')
    })
  
  const { values, setValues, handleChange, handleSubmit } = useForm(sendMessage)
  const storeMsg = [];
  const arr = [];
  const [getData,setGetData] = useState([]);
  const [state,setState] = useState([])
  const [loading,setLoading] = useState(false)
  const splitPathName = parseInt(window.location.pathname.split('/')[2]);
  let userObj = JSON.parse(localStorage.getItem('user'));
  
  useEffect(() => {
    friendData()
    socket.on('message',data => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false);
      }, 500) 
      storeMsg.push(data)
      setState(storeMsg)
      console.log('use effect array',storeMsg)
    })
  },[])

  async function friendData(){
    const getFriendData = await axios.get('http://localhost:8080/message')
    setGetData(getFriendData.data)
  }


  getData.map(obj => {
    if (obj.username === userObj.username && obj.receiver_id === splitPathName) {
      arr.push(obj)
    }
  })

  // make textarea blank on submit
  
  function sendMessage(){
    axios.post('http://localhost:8080/message', { values,arr })
    socket.emit('message',{ handler: userObj.username, message: values.message })
    setValues({})
  }
   
  // console.log('55',!loading)

  const mapOverState = state.map(obj => {
    return (
      <p>{obj.handler}: {obj.message}</p>
    )
  })
  
  return (
    <div className="master-message-container">
      <div className="message-form-container">
        <form className="message-form" onSubmit={handleSubmit}>
         <textarea name="message" value={values.message} className="input-area" type="text" placeholder="message" onChange={handleChange}></textarea>
         <button className="message-page-button">Send</button>
        </form>
        {loading ? <PulseLoader className="loading" loading={loading} size={20} /> : null}
      </div>
    <div className="chat-log" id="chat-log">
      {storeMsg !== [] ? mapOverState : null}
    </div>
    </div>
  )
}





  
 
  

  
 


   