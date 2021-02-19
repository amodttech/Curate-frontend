import React, {useEffect} from 'react';
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
  // USE EFFECTS
  useEffect(() => {   ///// Initial Fetch for Exhibitions Index
    fetch("http://localhost:3000/exhibitions")
    .then((r) => r.json())
    .then((data) => {
      // setExhibitionsList(data)
      dispatch(setExhibitions(data))
    })
  }, [dispatch])
  //// ------------
  // EXHIBIT LIST RENDERER

  const exhibitionsWithObjects = exhibitionsListFromStore.filter(exhibit => // filters out exhibitions without objects saved
    exhibit.exhibition_objects.length >= 1)

  const exhibitionsComponents = exhibitionsWithObjects.map(exhibit => 
    <ExhibitCard key={exhibit.id} exhibit={exhibit}/>)
  //// ------------
  
  console.log('exhibitionsListFromStore', exhibitionsListFromStore)

  return (
    <div className="home-container">
      <h3> {user.id ? `Welcome Home, ${user.username}` : "Let's look at some art!"}</h3>
      <p></p>
      {exhibitionsListFromStore ? 
      <ul className="home-exhibit-list">{exhibitionsComponents}</ul> : 
      null}
    </div>
  );
}

export default Home;