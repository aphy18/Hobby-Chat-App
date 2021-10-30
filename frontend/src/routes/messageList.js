import { useEffect, useState } from 'react';

import '../styles/MessageList.css';
import MessageOption from '../components/MessageOption';
import axios from 'axios';

export default function MessageList() {

  const [data,setData] = useState([])
  
  async function getAllUserData() {
    const userData = await axios.get(`http://localhost:8080/messageList`);
    console.log('this is user data ---->', userData)
    setData(userData.data)

  }
  
  useEffect(() => {
    getAllUserData()
    
  }, [])

  console.log('hi im data --->', data)
  
  
  
  const users = data.map(user => {
    return (
      <>
      <div className="message-list-container">
        <MessageOption />
      </div>
      </>
    )
  })
  
  return (
    <>
    {users}
    </>
  )
  


  
   
    
  

}