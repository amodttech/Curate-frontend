import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import '../../stylesheets/exhibit.css'
/// REDUX IMPORTS
import { useSelector} from 'react-redux'
/// COMPONENTS
import ExhibitGallery from './ExhibitGallery'
import EditExhibit from './EditExhibit';

function Exhibit() {

  const location = useLocation();
  const currentId = location.pathname.split('/')[2]
  // REDUX
  const user = useSelector((state) => state.user)
  const thisExhibitFromState = Object.values(useSelector((state) => state.exhibitions[currentId-1]))
  const thisExhibitObjects = Object.values(useSelector((state) => state.exhibitions[currentId-1].exhibition_objects))
  //// ------------
  // VARIABLES
  const name = thisExhibitFromState[2]
  const description = thisExhibitFromState[3]
  const userId = thisExhibitFromState[1]
  //// ------------
  // USESTATES
  const [displayType, setDisplayType] = useState("gallery")
  //// ------------
  // EVENT HANDLERS
  function setGallery(){
    setDisplayType("gallery")
  }
  function setEditView(){
    setDisplayType("edit")
  }

 /////    DEPRECATED, BUT MAY BRING BACK SOMEDAY    //////
          // // HELPER FUNCTIONS
          // useEffect(() => {
          //   if (exhibitListSize > 0){   ///  If getting list from state, return only the exhibition that matches path ID
          //     const thisExhibitFromState = exhibitionsListFromStore.filter(exhibit => exhibit.id === parseInt(currentId))
          //     setExhibitionObjects(thisExhibitFromState[0].exhibition_objects)
          //     setExhibitionData(thisExhibitFromState[0])
          //     setUserId(thisExhibitFromState[0].user_id)
          //   } else {
          //     getExhibition()
          //   }
          // }, [userId])

          // function getExhibition(){
          //   fetch(`http://localhost:3000${location.pathname}`)
          //     .then((r) => r.json())
          //     .then((data) => {
          //       setExhibitionData(data)
          //       setExhibitionObjects(data.exhibition_objects)
          //       setUserId(data.user_id)
          //     })
          // }
          //// ------------

          // DESTRUCTURE   //  Must be placed here, after the useEffect
            // const {name, description, theme} = exhibitionData
            //// ------------

 /////    --------------------------------------    //////

  return (
    <div className="exhibit-container">
      <div className="exhibit-controller">
        {(user.id === userId)? 
        <>
        <div onClick={setEditView} 
          className={
            (displayType === "edit") 
            ? "exhibit-controller-button-current" 
            : "exhibit-controller-button"}>
            EDIT VIEW</div> 
        <div onClick={setGallery} 
          className={
            (displayType === "gallery") 
            ? "exhibit-controller-button-current" 
            : "exhibit-controller-button"}>
            GALLERY VIEW</div></>
            : null }
      </div>
      <div className="exhibit-title">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
      <div className="exhibit-display-container">
        {(displayType === "edit") 
          ? <EditExhibit 
              exhibitionObjects={thisExhibitObjects} 
              exhibitionData={thisExhibitFromState} /> 
              : null}
        {(displayType === "gallery") 
          ? <ExhibitGallery 
              exhibitionObjects={thisExhibitObjects} />  
              : null}
      </div>
    </div>
  );
}

export default Exhibit;