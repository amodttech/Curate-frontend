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
  const currentId = location.pathname.split('/')[2]
  // REDUX
  const user = useSelector((state) => state.user)
  const exhibitionsListFromStore = Object.values(useSelector((state) => state.exhibitions))
  const exhibitListSize = Object.keys(exhibitionsListFromStore).length
  //// ------------
  // USESTATES
  const [editToggle, setEditToggle] = useState(false)
  const [displayType, setDisplayType] = useState("gallery")
  const [userId, setUserId] = useState(null)
  const [exhibitionObjects, setExhibitionObjects] = useState([])
  const [exhibitionData, setExhibitionData] = useState({})
  //// ------------
  // DESTRUCTURE
  const {id, name, description, theme} = exhibitionData
  //// ------------
  // HELPER FUNCTIONS
  function getExhibition(){
    fetch(`http://localhost:3000${location.pathname}`)
      .then((r) => r.json())
      .then((data) => {
        setExhibitionData(data)
        setExhibitionObjects(data.exhibition_objects)
        setUserId(data.user_id)
      })
  }
  useEffect(() => {
    if (exhibitListSize > 0){
      const thisExhibitFromState = exhibitionsListFromStore.filter(object => object.id === parseInt(currentId))
      setExhibitionObjects(thisExhibitFromState[0].exhibition_objects)
      setExhibitionData(thisExhibitFromState[0])
      setUserId(thisExhibitFromState[0].user_id)
    } else {
      getExhibition()
    }
  }, [])
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


  return (
    <div className="exhibit-container">
      <div className="exhibit-controller">
        {(user.id === userId) 
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
        {(displayType === "gallery") ? <ExhibitGallery exhibitionObjects={exhibitionObjects} theme={theme}/> : <ExhibitTimeline exhibitionObjects={exhibitionObjects} theme={theme}/>}
      </div>
    </div>
  );
}

export default Exhibit;