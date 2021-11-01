import { useEffect, useState } from 'react';

import '../styles/MessageList.css';
import MessageOption from '../components/MessageOption';
import axios from 'axios';

export default function MessageList() {
  let userObj = JSON.parse(localStorage.getItem('user'))

  const [data,setData] = useState([]);
  const [msg,setMsg] = useState([]);
  
  async function getAllUserData() {
    const userData = await axios.get(`http://localhost:8080/messageList`);
    console.log('this is user data ---->', userData.data)
    setData(userData.data)
    

  }
  
  useEffect(() => {
    getAllUserData()
    
  }, [])

  const filterUsers = data.filter(user => user.id !== userObj.id)

  console.log('filtered users', filterUsers)

  
  const users = filterUsers.map(user => {
    
    console.log('user 28', user)
    return (
      <>
      <div className="message-list-container">
        <MessageOption user={user} data={data}/>
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