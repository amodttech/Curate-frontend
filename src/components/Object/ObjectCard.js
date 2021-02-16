import React from 'react';
import "../../stylesheets/object-card.css"
/// COMPONENTS
import SaveObject from './SaveObject'

function ObjectCard({artObject, currentExhibition, exhibitionSelected}) {
  const {objectID, objectURL, title, primaryImage, primaryImageSmall, artistDisplayName, objectDate, artistNationality} = artObject

  // Object Creators
  const artObjectSaveData = {
    met_id: objectID,
    title: title,
    artist: artistDisplayName,
    date: objectDate,
    origin: artistNationality,
    image: primaryImage
  }

  //// ------------

  return (
    <div className="object-card-container" style={{backgroundImage: `url(${primaryImageSmall})`}}>
      <div className="object-card-top-panel">
        {exhibitionSelected ? 
          <SaveObject 
            artObjectSaveData={artObjectSaveData} 
            currentExhibition={currentExhibition}/> 
            : null}
        <div className="object-card-title">
          {title}
        </div>
        <div className="object-card-details">
          <div className="object-card-artist">ARTIST: {artistDisplayName}</div>
          <div className="object-card-date">DATE: {objectDate}</div>
        </div>
      </div>
      <div className="object-card-bottom-panel" >
        <a className="met-link" href={objectURL} target="_blank" rel="noreferrer">Click to see on https://www.metmuseum.org/</a>
      </div>
      
    </div>
  );
}

export default ObjectCard;