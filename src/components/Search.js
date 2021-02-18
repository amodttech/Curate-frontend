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
  const [exhibitionSelected, setExhibitionSelected] = useState(false)
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
    return <ObjectCard key={artObject.id} artObject={artObject} currentExhibition={currentExhibition} exhibitionSelected={exhibitionSelected}/>
  })
  //// ------------

  function handleSelect(event){
    setExhibitionSelected(true)
    setCurrentExhibition(event)
  }


  return (
    <div className="search-container">
      <div className="search-input-div">
        <form className="search-form" onSubmit={handleSubmit}>
          <h2>Search</h2>
          <label>Search for an Art</label>
          <input className="search-input" type="text" value={query} onChange={(e) => setQuery(e.target.value)}></input>
          <p></p>
          <button type="submit">SEARCH</button>
          {searching ? <p className="search-saerching">Searching...</p> : <p className="search-saerching"></p>}
          {notFound ? <p className="search-not-found">NO MATCHES</p> : <p className="search-not-found"></p>}

          <div className="search-exhibit-menu-container">
            {user.id
            ? <>
            <p>Choose an exhibition to save items to:</p>
            <select id="categories" 
              defaultValue={'DEFAULT'} 
              name="categories" 
              placeholder="choose" 
              onChange={(e) => handleSelect(e.target.value)}>
              <option value="DEFAULT" disabled selected>Your Exhibitions</option>
              {exhibitionsOptions}
            </select></> : null }
          </div>
        </form>
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