import React from 'react';
import { Route, Switch } from 'react-router-dom';
// COMPONENT IMPORTS
import NavBar from "./NavBar";
import Home from "./Home";
import Login from "./User/Login";
import Profile from "./User/Profile";
import Search from "./Search";
import Exhibit from "./Exhibit/Exhibit"
import NewExhibit from "./Exhibit/NewExhibit"
import SignUp from "./User/SignUp"


function App() {

  return (
    <div className="tip-top-div">
      <div className="app-nav">
        <NavBar />
      </div>
      <div className="app-body">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/profile">
            <Profile  />
          </Route>
          <Route exact path="/search">
            <Search  />
          </Route>
          <Route exact path="/signup">
            <SignUp  />
          </Route>
          <Route path="/exhibitions/:id">
            <Exhibit  />
          </Route>
          <Route path="/new-expedition">
            <NewExhibit  />
          </Route>

        </Switch>
      </div>
    </div>
  );
}

export default App;
