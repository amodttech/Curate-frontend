import React, {useState} from 'react';
import { Route, Switch } from 'react-router-dom';

import NavBar from "./NavBar";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import Search from "./Search";

function App() {

  const [login, setLogin] = useState(null)


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
            <Home />
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
