import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Friends.css'

// when u change ur username friends doesnt work

export default function Friends() {

  const [data,setData] = useState([])
  const [remove,setRemove] = useState(false)
  const arr = [];
  const [friendDeletion,setFriendDeletion] = useState(null);
  const [friendObj,setFriendObj] = useState({})
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

  function confirmDeletion(person){
    setRemove(true);
    console.log('person -->',person)
    setFriendObj(person)
    setFriendDeletion(person.friend_username)
  }

  function DeleteFriend(obj){
    console.log('obj to delete',obj)
    axios.put('http://localhost:8080/friends', { obj })
    window.location.reload()
  }
  
  // console.log('arr -->', arr)
  // console.log("friend data --->", data)


  const allFriends = arr.map(friend => {
    return (
      <div className="friend-container">
        <p className="friend-username"><b>{friend.friend_username}</b></p>
        <div className="message-icon-trash-container">
        <a href={`/message/${friend.receiver_id}`} className="message-friend-icon"><i class="far fa-comments"></i></a>
        <span className="trash-icon"><i class="fas fa-trash" onClick={() => confirmDeletion(friend)}></i></span>
        </div>
      </div>
    )
  })

  return (!remove) ? (
    <>
    <h1>Friends</h1>
    {allFriends}
    </>
  ) : (
    <>
    <h1>Friends</h1>
    <div className="friend-container">
       <p className="remove-friend-text">Remove {friendDeletion} from friends list?</p>
       <div className="request-btn-container">
       <button className='accept-request-btn' onClick={() => DeleteFriend(friendObj)}>Yes</button>
       <button className='decline-request-btn' onClick={() => setRemove(false)}>No</button>
       </div>
      </div>
      {allFriends}
    </>
  )
}