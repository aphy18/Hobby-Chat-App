import '../styles/Message.css'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios'
import useForm from '../customHooks/useForm';


export default function Message(){
  const { values, handleChange, handleSubmit } = useForm(submitMessage)
  const [nonLoggedInUsers,SetNonLoggedInUsers] = useState({})
  const [idArr,setIdArr] = useState([])
  const arr = []
  const splitPathName = parseInt(window.location.pathname.split('/')[2])

  async function getUserData() {
    const userData = await axios.get(`http://localhost:8080/message/${splitPathName}`);
    console.log('this is user data ---->', userData.data)
    console.log('this is user data ---->', userData.data[0].receiver_id)
    SetNonLoggedInUsers(userData.data[0].receiver_id)
    
    for (let user in nonLoggedInUsers) {
      console.log('non logged in ulol -->', parseInt(nonLoggedInUsers[user]))
      if (!isNaN(nonLoggedInUsers[user])) {
        arr.push(parseInt(nonLoggedInUsers[user]))
      }
    }
   
   setIdArr(arr)
}


  function submitMessage(){
    console.log('message smitted')
  }

  useEffect(() => {
    getUserData()
  },[idArr])

  console.log('id array', idArr)
  
 
  const mapOverId = idArr.map(userID => {
    console.log('id 44', userID)
    console.log('pahnalme', splitPathName)
    if (userID === splitPathName) {
      return (
        <div className="master-message-container">
          <form className="message-form" onSubmit={handleSubmit}>
           <input type="text" name="message" value={values.message}></input>
          <button>Send Message</button>
         </form>
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

  
 
  

  
 


   