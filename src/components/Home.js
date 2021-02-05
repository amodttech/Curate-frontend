import React from 'react';
import '../stylesheets/home.css'
import { useSelector } from 'react-redux'

function Home() {

  const user = useSelector((state) => state.user)
  const exhibitionsList = useSelector((state) => state.allExhibitions)

  console.log(exhibitionsList)

  return (
    <div className="home-container">
      <h1>Welcome Home {user ? user.display_name : ""}</h1>
    </div>
  );
}

export default Home;