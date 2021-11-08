import '../styles/Message.css'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios'
import useForm from '../customHooks/useForm';


export default function Message(){
  const userObj = JSON.parse(localStorage.getItem('user'));
  const { values, handleChange, handleSubmit } = useForm(submitMessage)
  const arr = []
  const idealArr= []
  const splitPathName = parseInt(window.location.pathname.split('/')[2])
  const socket = io('http://localhost:8080')

  // states
  const [nonLoggedInUsers,SetNonLoggedInUsers] = useState({});
  const [state,setState] = useState([]);
  const [render,setRender] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [idealUser,setIdealUser] = useState(null);

  

  function socketConnection(){
    console.log(socket)
  }
   
  async function getUserData() {
    const userData = await axios.get(`http://localhost:8080/message/${splitPathName}`);
    console.log('this is user data ---->', userData.data[userData.data.length - 1].receiver_id)
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
    const axiosreq = axios.post(`http://localhost:8080/message/${splitPathName}`, { userObj, values, idealArr });
    console.log(axiosreq)
  }
  

  // maybe make this a promise so u can use .then for state
  function submitMessage(){
    postUserMessage();
    setSubmit(true);
    socket.emit('message', { name: userObj.username, message: values.message });
  }

  useEffect(() => {
    getUserData()
    socketConnection()
    
  },[render])

  function renderChat() {
    return (
      <div>
        <p>{userObj.username}: {values.message}</p>
      </div>
    )
  }
   
  const mapOverId = state.map((userID) => {
    if (userID === splitPathName) {
      idealArr.push(userID)
      return (
        <div className="master-message-container">
          <form className="message-form" onSubmit={handleSubmit}>
           <textarea type="text" className="input-area" name="message" value={values.message} onChange={handleChange}></textarea>
          <button className="message-page-button">Send Message</button>
         </form>
         <div className="chat-log">
            { submit ? renderChat() : null}
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


  
 
  

  
 


   