
// store username and id, store it in a message table on POST, on GET receive it back
import { useEffect, useState } from 'react';
import '../styles/MessageList.css';
import MessageOption from '../components/MessageOption';
import axios from 'axios';

export default function MessageList() {
  
  const [data,setData] = useState([]);
  const arr = []
  
  async function getAllUserData() {
    
    const userData = await axios.get(`http://localhost:8080/messageList`);
    console.log('this is user data ---->', userData.data)
    setData(userData.data)
  }

  function postCurrentUser() {
    axios.post(`http://localhost:8080/messageList`, { arr })
  }

  
  data.map(obj => {
      arr.push(obj.id)
    }
  )

  const mapOverArr = data.map(user => {
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
  
  return (
    <>
    {mapOverArr}
    </>
  )
  
}