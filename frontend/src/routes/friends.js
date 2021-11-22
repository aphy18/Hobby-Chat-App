import { useState, useEffect } from "react"
import axios from "axios"
import '../styles/Friends.css'


export default function Friends() {

  const [data,setData] = useState([])
  const userObj = JSON.parse(localStorage.getItem('user'))

  async function userData() {
    const getUserData = await axios.get('http://localhost:8080/friends')
    console.log('getting userData -->', getUserData)
    setData(getUserData.data)
  }

  console.log('data 15', data)

  useEffect(() => {
    userData()
  },[])

  function acceptFriendReq(requestObj) {
    axios.post('http://localhost:8080/friends', { userObj, requestObj})
    axios.put('http://localhost:8080/friends', { requestObj })
    alert('friend request accepted !')
    window.location.reload();
  }

  function declineFriendReq(requestObj) {
    axios.put('http://localhost:8080/friends', { requestObj })
    alert('friend request rejected !')
    window.location.reload();
  }

  // change to username

  const mapOverRequests = data.map(req => {
    if (req.receiver_username === userObj.username) {
      return (
        <div className="request-container">
         <p>{req.sender_username} wants to be your friend ! Will you accept {req.sender_username}'s friend request ?</p>
         <button onClick={() => acceptFriendReq(req)}>Yes</button>
         <button onClick={() => declineFriendReq(req)}>No</button>
        </div>
      )
    }
  })

  return (
   <>
    <h1>Friends Page</h1>
    {mapOverRequests}
    </>
  )
}