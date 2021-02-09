import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import '../../stylesheets/save-object.css'
/// REDUX IMPORTS
import { useSelector, useDispatch } from 'react-redux'


function SaveObject({artObjectSaveData, currentExhibition}) {
  // USESTATES
  const [saved, setSaved] = useState(false)
  //// ------------
  console.log( `prop: current exhibition id:`, currentExhibition)
  // EVENT HANDLERS

  
  async function handleSaveClick(){
    const newArtObject = await postNewArtObject(artObjectSaveData)
    await console.log('new art object', newArtObject)
    const newExhibitionObject = await postNewExhibitionObject(newArtObject)
    await console.log('new exhibit object', newExhibitionObject)
    setSaved(true)
    console.log('saved? ', saved)
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
    order_number: null
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