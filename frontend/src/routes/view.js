
// store username and id, store it in a message table on POST, on GET receive it back
import { useEffect, useState } from 'react';
import '../styles/View.css';
import MessageOption from '../components/MessageOption';
import axios from 'axios';

export default function View() {

  const [data,setData] = useState([])

  async function userData() {
    const getUserData = await axios.get('http://localhost:8080/view')
    console.log('getting userData -->', getUserData)
    setData(getUserData.data)
  }

  useEffect(() => {
    userData()
  },[])
  
  console.log('this is data',data)

  const mapOverEverything = data.map(user => {
    return (
      <div className="user-container">
        <p>{user.username}</p>
      </div>
    )
  })

 return (
   <>
   <div className="view-container">
  <div className="view-header-container">
   <h1>View Users</h1>
  </div>
  <div className="view-body-container">
     {mapOverEverything}
  </div>
   </div>
   </>
 )
 
  
}