import { useState, useEffect } from "react"
import axios from "axios"
import '../styles/Requests.css'


export default function Requests() {

  const [data,setData] = useState([])
  const userObj = JSON.parse(localStorage.getItem('user'))

  async function userData() {
    const getUserData = await axios.get('http://localhost:8080/requests')
    console.log('getting userData -->', getUserData)
    setData(getUserData.data)
  }


  useEffect(() => {
    userData()
  },[])

  async function acceptFriendReq(requestObj) {
    console.log('request information -->', requestObj)
    // saving the friendship
    axios.post('http://localhost:8080/requests', { userObj, requestObj})
    // deleting the request
    axios.put('http://localhost:8080/requests', { requestObj })
    alert('friend request accepted !')
    window.location.reload();
  }

  function declineFriendReq(requestObj) {
    axios.put('http://localhost:8080/requests', { requestObj })
    alert('friend request rejected !')
    window.location.reload();
  }

  // change to username

  const mapOverRequests = data.map(req => {
    if (req.receiver_username === userObj.username) {
      return (
        <div className="request-container">
         <p className="request-question">Incoming Friend Request: {req.sender_username}</p>
         <div className="request-btn-container">
           <button className="accept-request-btn" onClick={() => acceptFriendReq(req)}>Accept</button>
           <button className="decline-request-btn" onClick={() => declineFriendReq(req)}>Decline</button>
        </div>
        </div>
      )
    }
  })

  return (
   <>
    <h1>Friend Request Page</h1>
    {mapOverRequests}
    </>
  )
}