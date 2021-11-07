import '../styles/Message.css'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios'
import useForm from '../customHooks/useForm';


export default function Message(){
  const { values, handleChange, handleSubmit } = useForm(submitMessage)
  const [nonLoggedInUsers,SetNonLoggedInUsers] = useState({})
  const [state,setState] = useState([])
  const [render,setRender] = useState(false)
  const arr = []
  const splitPathName = parseInt(window.location.pathname.split('/')[2])

  function socketConnection(){
    const socket = io('http://localhost:8080')
    console.log(socket)
  }
   
  async function getUserData() {
    const userData = await axios.get(`http://localhost:8080/message/${splitPathName}`);
    console.log('this is user data ---->', userData.data[0].receiver_id)
    SetNonLoggedInUsers(userData.data[0].receiver_id)
    
    for (let user in nonLoggedInUsers) {
      console.log('loge -->', parseInt(nonLoggedInUsers[user]))
      if (!isNaN(nonLoggedInUsers[user])) {
        arr.push(parseInt(nonLoggedInUsers[user]))
      }
    }
   
    setState(arr)
    setRender(true)
}
  


  function submitMessage(){
    console.log('yay')
  }

  useEffect(() => {
    getUserData()
    socketConnection()
    
  },[render])

  
  
 
 
  const mapOverId = state.map((userID) => {
    console.log('is ->', userID)
    if (userID === splitPathName) {
      return (
        <div className="master-message-container">
          <form className="message-form" onSubmit={handleSubmit}>
           <textarea type="text" className= "input-area" name="message" value={values.message} onChange={handleChange}></textarea>
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


  
 
  

  
 


   