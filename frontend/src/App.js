import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './routes/login';
import Register from './routes/register';
import Home from './routes/home';
import Profile from './routes/profile';
import Nav from './components/Nav'


function App() {
  const [loginValidation, setLoginValidation] = useState(false)

  return (
    <Router>
      <Nav navState={loginValidation} />
      <Switch>
        <Route exact path="/" component={Home} loggedIn={loginValidation} setLoggedIn={setLoginValidation} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </Router>
  )
}

export default App;
