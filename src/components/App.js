import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
// REDUX IMPORTS
import {useDispatch, useSelector} from 'react-redux'
import {increment, decrement, firstExhibitions} from '../actions'
// COMPONENT IMPORTS
import NavBar from "./NavBar";
import Home from "./Home";
import Login from "./User/Login";
import Profile from "./User/Profile";
import Search from "./Search";



function App() {

  // TEST REDUX
  const counter = useSelector(state => state.counter)
  const isLogged = useSelector(state => state.isLogged)
  const dispatch = useDispatch()

  ////  USE EFFECTS
  useEffect(() => {   ///// Initial Fetch for Exhibitions Index
    fetch("http://localhost:3000/exhibitions")
    .then((r) => r.json())
    .then((data) => {
      console.log(data)
      dispatch(firstExhibitions(data))
    })
  }, [])




  return (
    <div className="tip-top-div">
      <div className="app-nav">
        <NavBar />
      </div>
      <div className="app-body">
        Counter {counter}
        <button onClick={()=> dispatch(increment(5))}>+</button>
        <button onClick={()=> dispatch(decrement())}>-</button>
        {isLogged ? "youre logged in" : ''}

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

        </Switch>
      </div>
    </div>
  );
}

export default App;
