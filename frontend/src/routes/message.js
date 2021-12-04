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
  const storeMessages = [];
  const [socketInfo,setSocketInfo] = useState({})
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

  async function sendMessage(){
    await axios.post('http://localhost:8080/message', { values,arr })
    setValues({})
  }

  async function emitMessage(){
    await socket.emit('message',{ handler: userObj.username, message: values.message })
    setMessage(true)
  }

  useEffect(() => {
    receiveMessage()
  },[message])

  
  function receiveMessage(){
    socket.on('message', (data) => {
      console.log('this is socket messsage data',data)
      const userMessage = React.createElement('p',{class: 'user-message'},`${data.handler}: ${data.message}`)
      console.log('USER MESSAGE',userMessage)
      ReactDOM.render(userMessage,document.getElementById('chat-log'))
    })
  }

  console.log(storeMessages)
  


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
      {/* make a seperate variable for displaying messages, map over an array of
      messages and put them in the chat log (going to need to use socket io for the live messaging effect) */}
    </div>
    </div>
  )
}





  
 
  

  
 


   