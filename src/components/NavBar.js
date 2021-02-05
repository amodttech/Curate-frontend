import React from 'react';
import { useHistory } from "react-router-dom";
import '../stylesheets/nav-bar.css'

// import { useSelector } from 'react-redux'


function NavBar() {

  const history = useHistory();
  // NAVIGATION HANDLERS
  function handleHome(){
    history.push("/")
  }
  function handleSearch(){
    history.push("/search")
  }
  // function handleExhibition(){

  // }
  function handleLogin(){
    history.push("/login")
  }
  function handleLogout(){

  }


  

  return (
    <div className="nav-container">
      <div className="nav-title" onClick={handleHome}>CURATE</div>
      <div className="nav-button" onClick={handleSearch}>SEARCH</div>
      <div className="nav-button">EXHIBITION</div>

        <div className="nav-button" onClick={handleLogout}>LOGOUT</div> 
        <div className="nav-button" onClick={handleLogin}>LOGIN</div>
      


      

    </div>
  );
}

export default NavBar;