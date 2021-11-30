import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
          <Route exact path="/message/:id" component={Message} />
          <Route exact path="/changepassword" component={ChangePassword} />
          <Route exact path="/requests" component={Requests} />
          <Route exact path="/friends" component={Friends} />
          </> 
         }
        </Switch>
      </Router>
    )
  
}

