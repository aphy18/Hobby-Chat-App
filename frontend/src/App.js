import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './routes/login';
import Register from './routes/register';
import Home from './routes/home';
import Profile from './routes/profile';
import View from './routes/view';
import Message from './routes/message';
import ChangePassword from './routes/changePassword';
import Nav from './components/Nav';
import NewHobby from './components/NewHobby';
import Requests from './routes/requests';
import Friends from './routes/friends';



export default function App() {
  let userObj = JSON.parse(localStorage.getItem('user'))
  const [data,setData] = useState([])
  const arr = [];

  async function getFriendData() {
    const getFriends = await axios.get('http://localhost:8080/friends')
    setData(getFriends.data)
  }

  useEffect(() => {
    getFriendData()
  },[])
  
  // all friendships are duplicated, only taking 1 of each
  if (userObj) {
    data.map(obj => {
      if (obj.username === userObj.username) {
        arr.push(obj)
      }
    })
  }

  // pass receiverId as props
  // i am trying to get a query response on this page so i can save the messages

  

  const allFriends = arr.map(friend => {
    return (
      <Route exact path={`/message/${friend.receiver_id}`} component={Message} />
    )
  })
 
  return (
      <Router>
        <Nav />
        <Switch>
          
          { !userObj ?
          <>
           <Route exact path="/" component={Home} />
           <Route exact path="/login" component={Login} />
           <Route exact path="/register" component={Register} />
           </>
           : 
           <>
          <Route exact path="/" component={Home} />
          <Route exact path={`/profile/${userObj.id}`} component={Profile} />
          <Route exact path={`/hobby/${userObj.id}`} component={NewHobby} />
          <Route exact path="/view" component={View} />
          <Route exact path="/changepassword" component={ChangePassword} />
          <Route exact path="/requests" component={Requests} />
          <Route exact path="/friends" component={Friends} />
          {allFriends}
          </> 
         }
        </Switch>
      </Router>
    )
  
}

