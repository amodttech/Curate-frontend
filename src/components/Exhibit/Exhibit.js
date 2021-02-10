import React, {useEffect, useState} from 'react';
import {useLocation, useHistory} from "react-router-dom";
import '../../stylesheets/exhibit.css'
/// REDUX IMPORTS
import { useSelector} from 'react-redux'
/// COMPONENTS
import ExhibitTimeline from './ExhibitTimeline'
import ExhibitGallery from './ExhibitGallery'
import EditExhibit from './EditExhibit';

function Exhibit() {
  let history = useHistory()
  const location = useLocation();
  // REDUX
  const user = useSelector((state) => state.user)
  const exhibitionsListFromStore = Object.values(useSelector((state) => state.exhibitions))
  console.log('exhibitionsListFromStore', exhibitionsListFromStore)
  //// ------------

  // help to extract this exhibition from state

  const thisExhibitFromState = exhibitionsListFromStore.filter(exhbitionObj => exhbitionObj.id === location.pathname)
  console.log("thisExhibitFromState", thisExhibitFromState)




  // USESTATES
  const [exhibitionData, setExhibitionData] = useState({})
  const [editToggle, setEditToggle] = useState(false)
  const [displayType, setDisplayType] = useState("gallery")
  console.log('exhibitionData', exhibitionData)
  const {id, user_id, name, description, theme, exhibition_objects} = exhibitionData
  // console.log('exhibtion-objects', exhibition_objects)
  //// ------------
  // EVENT HANDLERS
  function setGallery(){
    setDisplayType("gallery")
  }
  function setTimeline(){
    setDisplayType("timeline")
  }
  function handleDelete(){
    fetch(`http://localhost:3000/exhibitions/${id}`, {
        method: "Delete"
    })
    history.push("/")
  }
  function handleEdit(){
    setEditToggle(!editToggle)
  }
  //// ------------
  // USE EFFECTS
  useEffect(() => {   ///// Initial Fetch for Exhibition Data
    fetch(`http://localhost:3000${location.pathname}`)
    .then((r) => r.json())
    .then((data) => {
      setExhibitionData(data)
    })
  }, [location.pathname])
  //// ------------
  

  return (
    <div className="exhibit-container">
      <div className="exhibit-controller">
        {(user.id === user_id) 
        ? <><div onClick={handleEdit} className="exhibit-controller-button">EDIT</div>
        <div onClick={handleDelete} className="exhibit-controller-button">DELETE</div></>
        : null}
        <div onClick={setGallery} className={(displayType === "gallery") ? "exhibit-controller-button-current" : "exhibit-controller-button"}>GALLERY VIEW</div>
        <div onClick={setTimeline} className={(displayType === "timeline") ? "exhibit-controller-button-current" : "exhibit-controller-button"}>TIMELINE VIEW</div>
      </div>
      {editToggle ? <div><EditExhibit handleEdit={handleEdit} exhibitionData={exhibitionData} /></div> : null}
      <h1>{name}</h1>
      <h3>{description}</h3>
      <div className="exhibit-view-container">
        {(displayType === "gallery") ? <ExhibitGallery exhibitionObjects={exhibition_objects} theme={theme}/> : <ExhibitTimeline exhibitionObjects={exhibition_objects} theme={theme}/>}
      </div>

    </div>
  );
}

export default Exhibit;