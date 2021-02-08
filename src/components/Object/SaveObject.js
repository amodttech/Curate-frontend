import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import '../../stylesheets/save-object.css'
/// REDUX IMPORTS
import { useSelector, useDispatch } from 'react-redux'


function SaveObject({artObjectSaveData}) {
  const history = useHistory();
  // REDUX
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const currentExhibition = useSelector((state) => state.currentExhibition)
  //// ------------
  // USESTATES
  const [showName, setShowName] = useState("")
  const [showDescription, setShowDescription] = useState("")
  const [displayTheme, setDisplayTheme] = useState("")
  //// ------------
  // EVENT HANDLERS
  function handleSaveClick(){
    console.log('clicked save')
    postNewArtObject(artObjectSaveData)
  }

  // HELPERS  - Posts object, if MET_ID already exists in DB, return the existing object
  function postNewArtObject(artObjectSaveData){
    fetch("http://localhost:3000/art_objects/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(artObjectSaveData),
    })
    .then((r) => r.json())
    .then((data) => {
      console.log(data)
      // history.push("/profile")
    })
  }


  return (
    <div className="save-object-container" onClick={handleSaveClick}>
      💾
    </div>
  );
}

export default SaveObject;