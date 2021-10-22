import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './routes/login';
import Register from './routes/register';
import Home from './routes/home';
import ViewProfile from './routes/ViewProfile';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/myprofile" component={ViewProfile} />
      </Switch>
    </Router>
  )
}

export default App;
