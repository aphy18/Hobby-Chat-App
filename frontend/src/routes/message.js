import React from 'react';
import { useState, useEffect, useRef } from 'react';
import '../styles/Message.css'
import io from 'socket.io-client';
import axios from 'axios'
import useForm from '../customHooks/useForm';
import ReactDOM from 'react-dom';

export default function Message() {

  const socket = io('http://localhost:8080')
    socket.on('connection', () => {
       console.log('connected')
    })

  const inputRef = useRef()
  const { values, setValues, handleChange, handleSubmit } = useForm(sendMessage)
  const arr = [];
  const [socketInfo,setSocketInfo] = useState([])
  const [message,setMessage] = useState(false)
  const [getData,setGetData] = useState([]);
  const splitPathName = parseInt(window.location.pathname.split('/')[2]);
  let userObj = JSON.parse(localStorage.getItem('user'));

  async function request(){
    const getFriendData = await axios.get('http://localhost:8080/message')
    setGetData(getFriendData.data)
  }

  useEffect(() => {
    request()
  },[])

  // console.log('data',data)

  getData.map(obj => {
    if (obj.username === userObj.username && obj.receiver_id === splitPathName) {
      arr.push(obj)
    }
  })

  // console.log('arr 37 -->',arr)

  function sendMessage(){
    axios.post('http://localhost:8080/message', { values,arr })
    setValues({})
    
  }

  async function emitMessage(){
    await socket.emit('message',{ handler: userObj.username, message: values.message })
    setMessage(true)
  }

  useEffect(() => {
    receiveMessage()
  },[message])

  
  async function receiveMessage(){
    const array = [];
    await socket.on('message', (data) => {
      array.push(data)
     console.log('array 65',array)
    })
    array.push(...socketInfo)
    setSocketInfo(array)
    // console.log('socket info 68',socketInfo)
  }


  

  function focus(){
    console.log(inputRef.current.value)
  }
  
  return (
    <div className="master-message-container">
      <div className="message-form-container">
        <form className="message-form" onSubmit={handleSubmit}>
         <textarea ref={inputRef} name="message" value={values.message} className="input-area" type="text" placeholder="message" onChange={handleChange}></textarea>
         <button className="message-page-button" onClick={() => emitMessage()}>Send</button>
         <button onClick={focus}>button</button>
        </form>
      </div>
    <div className="chat-log" id="chat-log">
     { }
    </div>
    </div>
  )
}





  
 
  

  
 


   