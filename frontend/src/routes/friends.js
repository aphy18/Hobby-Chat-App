import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Friends.css'

// when u change ur username friends doesnt work

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
  },[]);
  
  // all friendships are duplicated, only taking 1 of each
  data.map(obj => {
    if (obj.username === userObj.username) {
      arr.push(obj)
    }
  })

  function DeleteFriend(){
    axios.put('http://localhost:8080/friends')
  }
  
  console.log('arr -->', arr)
  console.log("friend data --->", data)


  const allFriends = arr.map(friend => {
    console.log('number', friend.receiver_id)
    return (
      <div className="friend-container">
        <p className="friend-username"><b>{friend.friend_username}</b></p>
        <div className="message-icon-trash-container">
        <a href={`/message/${friend.receiver_id}`} className="message-friend-icon"><i class="far fa-comments"></i></a>
        <span className="trash-icon"><i class="fas fa-trash" onClick={() => DeleteFriend()}></i></span>
        </div>
      </div>
    )
  })

  
  return (
    <>
    <h1>Friends</h1>
    {allFriends}
    </>
  )
}