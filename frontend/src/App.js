import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './routes/login';
import Register from './routes/register';
import Home from './routes/home';
import Profile from './routes/profile';
import Nav from './components/Nav'


function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </Router>
  )
}

export default App;
