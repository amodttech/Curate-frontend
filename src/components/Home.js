import React, {useState, useEffect} from 'react';
import '../stylesheets/home.css'
/// COMPONENTS
import ExhibitCard from './Exhibit/ExhibitCard'
/// REDUX IMPORTS
import { useSelector, useDispatch } from 'react-redux'
import {setExhibitions} from '../actions'


function Home() {
  // REDUX
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const exhibitionsListFromStore = Object.values(useSelector((state) => state.exhibitions))
  //// ------------
  // USESTATES
  const [exhibitionsList, setExhibitionsList] = useState([])
  //// ------------
  // USE EFFECTS
  useEffect(() => {   ///// Initial Fetch for Exhibitions Index
    fetch("http://localhost:3000/exhibitions")
    .then((r) => r.json())
    .then((data) => {
      setExhibitionsList(data)
      dispatch(setExhibitions(data))
    })
  }, [])
  //// ------------
  // EXHIBIT LIST RENDERER
  const exhibitionsComponents = exhibitionsListFromStore.map(exhibit => 
    <ExhibitCard key={exhibit.id} exhibit={exhibit}/>)
  //// ------------
  

  return (
    <div className="home-container">
      <h1>Welcome Home {user ? user.display_name : ""}</h1>
      <p></p>
      <p>If you were going to curate a show using art from throughout all art history, what would the theme be?</p>
      {exhibitionsList ? 
      <ul className="home-exhibit-list">{exhibitionsComponents}</ul> : 
      null}
    </div>
  );
}

export default Home;