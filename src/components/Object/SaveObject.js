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
  const [artId, setArtId] = useState(null)
  //// ------------
  // Object Creator
  const exhibitionObjectSaveData = {
    art_object_id: artId,
    exhibition_id: currentExhibition.id,
    order_number: null
  }
  //// ------------
  // EVENT HANDLERS
  async function handleSaveClick(){
    console.log('clicked save')
    const artObjectResponse = await postNewArtObject(artObjectSaveData)

    // const exhibitionObjectResponse = await postNewExhibitionObject(artObjectResponse)
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
      console.log('returned art object: ' + data)
      // history.push("/profile")
    })
  }
  // function postNewExhibitionObject(exhibitionObjectSaveData){
  //   fetch("http://localhost:3000/exhibition_objects/", {
  //       method: "POST",
  //       headers: {
  //           "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(exhibitionObjectSaveData),
  //   })
  //   .then((r) => r.json())
  //   .then((data) => {
  //     console.log('created exhibition object: ' + data)
  //     // history.push("/profile")
  //   })
  // }


  return (
    <div className="save-object-container" onClick={handleSaveClick}>
      💾
    </div>
  );
}

export default SaveObject;