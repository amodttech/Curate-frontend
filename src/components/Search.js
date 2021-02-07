import React, { useState } from "react";
import '../stylesheets/search.css'
import ObjectCard from './Object/ObjectCard'

function Search() {

  // USESTATES
  const [query, setQuery] = useState("")
  const [artObjects, setArtObjects] = useState([])

  // HANDLERS
  function handleSubmit(event){
    event.preventDefault()
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
    } catch {
      alert("not found");
    }
  }
  // Render the objects
  const artObjectComponents = artObjects.map(artObject => {
    return <ObjectCard key={artObject.id} artObject={artObject}/>
  })




  return (
    <div className="search-container">
      <div className="search-input-div">
        <h1>Search</h1>
        <form onSubmit={handleSubmit}>
          <label>Search for an Art</label>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}></input>
          <button type="submit">SEARCH</button>
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