import React, { useState } from "react";
import '../stylesheets/search.css'
/// REDUX IMPORTS
import { useSelector} from 'react-redux'
/// COMPONENT IMPORTS
import ObjectCard from './Object/ObjectCard'

function Search() {
  // REDUX
  const user = useSelector((state) => state.user)
  const exhibitionsList = Object.values(useSelector((state) => state.exhibitions))
  // USESTATES
  const [query, setQuery] = useState("")
  const [artObjects, setArtObjects] = useState([])
  const [searching, setSearching] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [currentExhibition, setCurrentExhibition] = useState(null)
  // HANDLERS
  function handleSubmit(event){
    event.preventDefault()
    setNotFound(false)
    setSearching(true)
    fetchIds()
  }
  // FETCH
  async function fetchIds(){
    try {
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&title=true&q=${query}`)
      const artObjectIds = await response.json()
      const {objectIDs} = artObjectIds
      const artObjs = await Promise.all(objectIDs.map(async id => {
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
        return await response.json()
    }))
      setArtObjects(artObjs)
      setSearching(false)
    } catch {
      setNotFound(true);
      setSearching(false)
    }
  }
  //// ------------
  // HELPERS
    const userExhibitions = exhibitionsList.filter(exhibit => 
      exhibit.user_id === user.id)
  //// ------------
  // EXHIBIT OPTIONS LIST RENDERER
  const exhibitionsOptions = userExhibitions.map(exhibit => 
      <option value={exhibit.id}>{exhibit.name}</option>)
  //// ------------
  // Render the objects
  const artObjectComponents = artObjects.map(artObject => {
    return <ObjectCard key={artObject.id} artObject={artObject} currentExhibition={currentExhibition}/>
  })
  //// ------------

  return (
    <div className="search-container">
      <div className="search-input-div">
        <h1>Search</h1>
        <form onSubmit={handleSubmit}>
          <label>Search for an Art</label>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}></input>
          <button type="submit">SEARCH</button>
        </form>
        {searching ? <p className="search-saerching">Searching...</p> : null}
        {notFound ? <p className="search-not-found">NO MATCHES</p> : null}
        <div className="search-exhibit-menu-container">
          Choose an exhibition to search for:
          <select id="categories" name="categories" placeholder="choose" onChange={(e) => setCurrentExhibition(e.target.value)}>
            <option value="" disabled selected>Your Exhibitions</option>
            {exhibitionsOptions}
          </select>
        </div>
      </div>
      <div className="search-return-div">
        <ul className="search-return-list">
          {artObjectComponents}
        </ul>
      </div>
    </div>
  );
}

export default Search;