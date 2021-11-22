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
    alert('friend request accepted !')
  }

  const mapOverRequests = data.map(req => {
    if (req.receiver_id === userObj.id) {
      return (
        <div className="request-container">
         <p>{req.sender_username} wants to be your friend ! Will you accept {req.sender_username}'s friend request ?</p>
         <button onClick={() => acceptFriendReq(req)}>Yes</button>
         <button>No</button>
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