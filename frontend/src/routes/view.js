
// store username and id, store it in a message table on POST, on GET receive it back
import { useEffect, useState } from 'react';
import '../styles/View.css';
import MessageOption from '../components/MessageOption';
import axios from 'axios';

// The POST request, we put the sender and receiver in a table

export default function View() {

 let userObj = JSON.parse(localStorage.getItem('user'))
 const [data,setData] = useState([])
 const storeNonLoggedInUsers = [];

  async function userData() {
    const getUserData = await axios.get('http://localhost:8080/view')
    console.log('getting userData -->', getUserData)
    setData(getUserData.data)
  }

  useEffect(() => {
    userData()
  },[])
  
  function sendFriendRequest(receiverObj) {
    axios.post('http://localhost:8080/view', { userObj, receiverObj })
    console.log('current user object -->', userObj)
    console.log('receiver object -->', receiverObj)
    alert(`friend request sent to ${receiverObj.username}`)
  }

  data.map(user => {
    if (user.username !== userObj.username) {
      storeNonLoggedInUsers.push(user)
    }
  })

  const mapOverEverything = storeNonLoggedInUsers.map(user => {
    return (
      <div className="user-container">
        <div className="user-header-container">
        <span className="user-image"><i class="fas fa-user"></i></span>
        <span className="user-name">{user.username}</span>
      </div>
      <div className="user-body-container">
      <div className="user-stats">
        <p style={{fontWeight: 'bold'}}><i>{user.person_bio}</i></p>
        <span>Hobby: {user.hobby_name}</span>
        <span>Experience: {user.level_of_expertise}</span>
        <span>Spending: {user.my_spending_estimate}</span>
        <span>Time Spent: {user.amount_of_time_doing_hobby}</span>
       </div>
       <div className="add-this-user">
         <p><i onClick={() => sendFriendRequest(user)} class="fas fa-user-plus"></i></p>
         <span>Add</span>
       </div>
      </div>
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