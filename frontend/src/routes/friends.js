import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Friends.css'



export default function Friends() {

  const [data,setData] = useState([])
  const arr = [];
  const userObj = JSON.parse(localStorage.getItem('user'))

  async function getFriendData() {
    const getFriends = await axios.get('http://localhost:8080/friends')
    setData(getFriends.data)
  }
  
  useEffect(() => {
    getFriendData()
  },[])
  
  // all friendships are duplicated, only taking 1 of each
  data.map(obj => {
    if (obj.username === userObj.username) {
      arr.push(obj)
    }
  })
  
  console.log('arr -->', arr)
  console.log("friend data --->", data)


  const allFriends = arr.map(friend => {
    return (
      <div className="friend-container">
        <p className="friend-username"><b>{friend.friend_username}</b></p>
        <a href={`/message/${friend.receiver_id}`} className="message-friend-icon"><i class="far fa-comments"></i></a>
      </div>
    )
  })
  


  // data.filter (where username === userObj.username)
  
  return (
    <>
    <h1>Friends</h1>
    {allFriends}
    </>
  )
}