import React, {useEffect, useState} from 'react';
import { useHistory, useLocation } from "react-router-dom";
import '../../stylesheets/exhibit.css'
/// REDUX IMPORTS
import { useSelector, useDispatch } from 'react-redux'

function Exhibit() {
  const history = useHistory();
  const location = useLocation();
  // REDUX
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  //// ------------
  // USESTATES
  const [exhibitionData, setExhibitionData] = useState({})
  const [displayType, setDisplayType] = useState("gallery")
  const {id, user_id, name, description, theme, exhibition_objects} = exhibitionData
  //// ------------
  // EVENT HANDLERS
  function setGallery(){
    setDisplayType("gallery")
  }
  function setTimeline(){
    setDisplayType("timeline")
  }
  //// ------------
  // USE EFFECTS
  useEffect(() => {   ///// Initial Fetch for Exhibition Data
    fetch(`http://localhost:3000${location.pathname}`)
    .then((r) => r.json())
    .then((data) => {
      setExhibitionData(data)
    })
  }, [])
  //// ------------

  return (
    <div className="exhibit-container">
      <div className="exhibit-controller">
        {(user.id === user_id) 
        ? <><div className="exhibit-controller-button">EDIT</div>
        <div className="exhibit-controller-button">DELETE</div></>
        : null}
        <div onClick={setGallery} className={(displayType === "gallery") ? "exhibit-controller-button-current" : "exhibit-controller-button"}>GALLERY VIEW</div>
        <div onClick={setTimeline} className={(displayType === "timeline") ? "exhibit-controller-button-current" : "exhibit-controller-button"}>TIMELINE VIEW</div>
      </div>
      <h1>{name}</h1>
      <h3>{description}</h3>

    </div>
  );
}

export default Exhibit;