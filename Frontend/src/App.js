import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import Home from './Components/Home'
import Profile from './Components/Profile'

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/ask" component={Home} />
        <Route exact path="/ask/:username" component={Profile} />
        <Redirect exact from="/" to="/ask" />
        <Route path="/signIn" component={SignIn} />
        <Route path="/signUp" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App