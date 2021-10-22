import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import login from './routes/login';
import register from './routes/register';
import home from './routes/home';
import view from './routes/view';
import myProfile  from './routes/myProfile';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={login} />
        <Route path="/register" component={register} />
        <Route path="/" component={home} />
        <Route path="/view" component={view} />
        <Route path="/myprofile" component={myProfile} />
      </Switch>
    </Router>
  )
}

export default App;
