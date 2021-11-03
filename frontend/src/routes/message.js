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
  let userObj = JSON.parse(localStorage.getItem('user'))

  async function getUserData() {
    const userData = await axios.get(`http://localhost:8080/message/${splitPathName}`);
    // console.log('this is user data ---->', userData.data[20].receiver_id)
    SetNonLoggedInUsers(userData.data[20].receiver_id)
    
    for (let user in nonLoggedInUsers) {
      // console.log('non logelld in ulol -->', parseInt(nonLoggedInUsers[user]))
      if (!isNaN(nonLoggedInUsers[user])) {
        arr.push(parseInt(nonLoggedInUsers[user]))
      }
    }
   
   setIdArr(arr)
}
  


  function submitMessage(){
    console.log('yay')
  }

  useEffect(() => {
    getUserData()
    
  },[idArr])

  
  
 
  const mapOverId = idArr.map(userID => {
    // console.log('id 44', userID)
    // console.log('pahnalme', splitPathName)
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

  
 
  

  
 


   