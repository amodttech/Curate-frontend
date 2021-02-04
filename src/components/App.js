import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavBar from "./NavBar";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";

function App() {
  return (
    <div className="tip-top-div">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login  />
        </Route>
        <Route exact path="/profile">
          <Profile  />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
