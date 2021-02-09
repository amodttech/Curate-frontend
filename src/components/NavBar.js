import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import '../stylesheets/nav-bar.css'
/// COMPONENTS
import ExhibitMenu from './Exhibit/ExhibitMenu'
/// REDUX IMPORTS
import { useSelector, useDispatch } from 'react-redux'
import {isLoggedOut} from '../actions'
import { setId, setDisplayName, setBio, addExhibitions, setUsername } from '../reducers/userSlice'

function NavBar() {
  const history = useHistory();
  // REDUX
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const loggedIn = useSelector((state) => state.loggedIn)
  //// ------------
  // USESTATES
  const [exhibitToggle, setExhibitToggle] = useState(false)
  //// ------------
  // NAVIGATION HANDLERS
  function handleHome(){
    history.push("/")
  }
  function handleSearch(){
    history.push("/search")
  }
  function handleExhibition(){
    setExhibitToggle(!exhibitToggle)
  }
  function handleNewExhibition(){
    history.push("/new-expedition")
  }
  function handleLogin(){
    history.push("/login")
  }
  function handleLogout(){
    dispatch(isLoggedOut())
    dispatch(setId(null))
    dispatch(setDisplayName(""))
    dispatch(setBio(""))
    dispatch(addExhibitions(""))
    dispatch(setUsername(""))
  }
  function handleSignup(){
    history.push("/signup")
  }
  function handleProfile(){
    history.push("/profile")
  }
  //// ------------

  
  console.log(loggedIn)
  return (
    <>
      <div className="nav-container">
        <div className="nav-title" onClick={handleHome}>CURATE</div>
        <div className="nav-button" onClick={handleSearch}>SEARCH</div>
        {loggedIn  ? <>
          <div className="nav-button" onClick={handleExhibition}>YOUR EXHIBITIONS</div>
          <div className="nav-button" onClick={handleNewExhibition}>NEW EXHIBITION</div>
          <div className="nav-button" onClick={handleProfile}>PROFILE</div>
          <div className="nav-button" onClick={handleLogout}>LOGOUT</div>
          </> : <>
          <div className="nav-button" onClick={handleLogin}>LOGIN</div>
          <div className="nav-button" onClick={handleSignup}>SIGN UP</div></>}
      </div>
      {exhibitToggle ? <div className="nav-exhibit-menu">
          <ExhibitMenu />
      </div> : null}
    </>
  );
}

export default NavBar;