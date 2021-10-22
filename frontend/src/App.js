import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './routes/Login';
import Register from './routes/Register';
import Home from './routes/Home';
import ViewProfile from './routes/ViewProfile';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/view" component={ViewProfile} />
      </Switch>
    </Router>
  )
}

export default App;
