import { useState, useEffect } from "react";
import axios from "axios";



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
  
  data.map(obj => {
    if (obj.username === userObj.username) {
      arr.push(obj)
    }
  })
  
  console.log('arr -->', arr)
  console.log("friend data --->", data)


  const allFriends = arr.map(friend => {
    return (
      <p>{friend.friend_username}</p>
    )
  })
  


  // data.filter (where username === userObj.username)
  
  return (
    <>
    <h1>Your Friends Page</h1>
    {allFriends}
    </>
  )
}