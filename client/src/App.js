import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Bootstrap
import Home from 'pages/Home';
import Signup from 'pages/Signup';
import Login from 'pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/home' exact component={Home} />
          <Route path='/' exact component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
