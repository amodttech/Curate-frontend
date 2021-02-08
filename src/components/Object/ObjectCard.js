import React from 'react';
import "../../stylesheets/object-card.css"
/// COMPONENTS
import SaveObject from './SaveObject'
/// REDUX IMPORTS
import { useSelector, useDispatch } from 'react-redux'

function ObjectCard({artObject}) {
  const {objectID, objectURL, title, primaryImage, primaryImageSmall, artistDisplayName, objectDate, artistNationality} = artObject
  // REDUX
  const loggedIn = useSelector((state) => state.loggedIn)
  const user = useSelector((state) => state.user)
  const currentExhibition = useSelector((state) => state.currentExhibition)
  //// ------------
  // Object Creator
  const artObjectSaveData = {
    met_id: objectID,
    title: title,
    artist: artistDisplayName,
    date: objectDate,
    origin: artistNationality,
    image: primaryImage,
    description: ""
  }
  //// ------------

  return (
    <div className="object-card-container" style={{backgroundImage: `url(${primaryImageSmall})`}}>
      <div className="object-card-top-panel">
        {loggedIn ? <SaveObject artObjectSaveData={artObjectSaveData}/> : null}
        <div className="object-card-title">
          {title}
        </div>
        <div className="object-card-details">
          <div className="object-card-artist">ARTIST: {artistDisplayName}</div>
          <div className="object-card-date">DATE: {objectDate}</div>
        </div>
      </div>
      <div className="object-card-bottom-panel" >
        <a className="met-link" href={objectURL} target="_blank">Click to see on https://www.metmuseum.org/</a>
      </div>
      
    </div>
  );
}

export default ObjectCard;