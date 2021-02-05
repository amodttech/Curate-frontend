import React, {useState, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';

import NavBar from "./NavBar";
import Home from "./Home";
import Login from "./User/Login";
import Profile from "./Profile";
import Search from "./Search";

function App() {
  ////  STATES
  const [login, setLogin] = useState([])
  const [allExhibittions, setAllExhibitions] = useState([])

  ////  USE EFFECTS
  useEffect(() => {   ///// Initial Fetch for Exhibitions Index
    fetch("http://localhost:3000/exhibitions")
    .then((r) => r.json())
    .then((data) => {
        console.log(data)
    })
  }, [])




  return (
    <div className="tip-top-div">
      <div className="app-nav">
        <NavBar 
          login={login} 
          setLogin={setLogin}/>
      </div>
      <div className="app-body">
        <Switch>
          <Route exact path="/">
            <Home 
              login={login}/>
          </Route>
          <Route exact path="/login">
            <Login 
              login={login} 
              setLogin={setLogin}/>
          </Route>
          <Route exact path="/profile">
            <Profile  />
          </Route>
          <Route exact path="/search">
            <Search  />
          </Route>

        </Switch>
      </div>
    </div>
  );
}

export default App;
