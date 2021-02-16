import React, {useState} from 'react';
import '../../stylesheets/save-object.css'
/// REDUX IMPORTS


function SaveObject({artObjectSaveData, currentExhibition}) {
  // USESTATES
  const [saved, setSaved] = useState(false)
  //// ------------
  // EVENT HANDLERS

  
  async function handleSaveClick(){
    const newArtObject = await postNewArtObject(artObjectSaveData)
    const newExhibitionObject = await postNewExhibitionObject(newArtObject)
    setSaved(true)
  }
  // HELPERS  - Posts object, if MET_ID already exists in DB, return the existing object
  async function postNewArtObject(artObjectSaveData){
    const response = await fetch("http://localhost:3000/art_objects/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(artObjectSaveData)
    })
    const returnedArtObj = await response.json()
    return returnedArtObj
  }
  async function postNewExhibitionObject(newArtObject){
  // OBJECT CREATOR
  const exhibitionObjectSaveData = {
    art_object_id: newArtObject.id,
    exhibition_id: currentExhibition,
    order_number: null,
    description: ""
  }
  //// -----------
  const response = await fetch("http://localhost:3000/exhibition_objects/", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(exhibitionObjectSaveData),
    })
    return await response.json()
  }


  return (
    <div className="save-object-container" onClick={handleSaveClick}>
      {!saved ? <>💾</> : <>✅</>}
    </div>
  );
}

export default SaveObject;