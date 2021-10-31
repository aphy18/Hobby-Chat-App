import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './routes/login';
import Register from './routes/register';
import Home from './routes/home';
import Profile from './routes/profile';
import MessageList from './routes/messageList';
import Nav from './components/Nav';
import NewHobby from './components/NewHobby';



function App() {
  let userObj = JSON.parse(localStorage.getItem('user'))
  

  if (!userObj) {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/messagelist" component={MessageList} />
        </Switch>
      </Router>
    )
  
  } else {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path={`/profile/${userObj.id}`} component={Profile} />
          <Route exact path={`/hobby/${userObj.id}`} component={NewHobby} />
          <Route exact path="/messagelist" component={MessageList} />
        </Switch>
      </Router>
    )
  
  }
}

export default App;

