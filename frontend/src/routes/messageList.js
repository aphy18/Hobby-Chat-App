// store username and id, store it in a message table on POST, on GET receive it back
import { useEffect, useState } from 'react';
import '../styles/MessageList.css';
import MessageOption from '../components/MessageOption';
import axios from 'axios';

export default function MessageList() {
  let userObj = JSON.parse(localStorage.getItem('user'))

  const [data,setData] = useState([]);
  const [currentUser,setCurrentUser] = useState({});
  
  async function getAllUserData() {
    const userData = await axios.get(`http://localhost:8080/messageList`);
    console.log('this is user data ---->', userData.data)
    setData(userData.data)

    userData.data.map(obj => {
    if (obj.id === userObj.id) {
      setCurrentUser({id: obj.id, username: obj.username})
    }
  })

  }

  function postCurrentUser() {
    axios.post(`http://localhost:8080/messageList`, { currentUser })
  }

  const filterUsers = data.filter(user => user.id !== userObj.id)
  const users = filterUsers.map(user => {
    
    console.log('user 28', user)
    return (
      <>
      <div className="message-list-container">
        <MessageOption user={user} data={data} onClick={() => postCurrentUser()} />
      </div>
      </>
    )
  })

  useEffect(() => {
    getAllUserData();
    
  }, [])

  console.log('current user 48 -->', currentUser)
  

  return (
    <>
    {users}
    </>
  )
  
}