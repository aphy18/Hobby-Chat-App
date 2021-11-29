import { useState, useEffect } from "react"
import axios from "axios"
import '../styles/Requests.css'


export default function Requests() {
  
  const storeRequests = [];
  const [data,setData] = useState([])
  const [req,setReq] = useState(storeRequests.length)
  const [store,setStore] = useState(false)
  const userObj = JSON.parse(localStorage.getItem('user'))

  async function userData() {
    const getUserData = await axios.get('http://localhost:8080/requests')
    console.log('userData -->', getUserData)
    setData(getUserData.data)
    setStore(true)
  }
  
  function getRequests() {
    for (let obj of data) {
      if (obj.receiver_username === userObj.username) {
        storeRequests.push(obj)
      }
    }
    setReq(storeRequests.length)
  }

  useEffect(() => {
    userData()
  },[])

  useEffect(() => {
    getRequests()
  },[store])


  async function acceptFriendReq(requestObj) {
    console.log('re information -->', requestObj)
    // saving the friendship
    axios.post('http://localhost:8080/requests', { userObj, requestObj})
    // deleting the request
    axios.put('http://localhost:8080/requests', { requestObj })
    // alert('friend request accepted !')
    window.location.reload();
  }

  function declineFriendReq(requestObj) {
    axios.put('http://localhost:8080/requests', { requestObj })
    // alert('friend request rejected !')
    window.location.reload();
  }


 const mapOverRequests = data.map(req => {
    if (req.receiver_username === userObj.username) {
      return (
        <div className="request-container">
         <p className="request-question">{req.sender_username} wants to be your friend.</p>
         <div className="request-btn-container">
           <button className="accept-request-btn" onClick={() => acceptFriendReq(req)}><i class="fas fa-check"></i></button>
           <button className="decline-request-btn" onClick={() => declineFriendReq(req)}><i class="fas fa-ban"></i></button>
        </div>
        </div>
      )
    }
  })

  return (
   <>
    <h1>{req} incoming requests</h1>
    {mapOverRequests}
    </>
  )
}