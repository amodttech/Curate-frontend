import React, {useState} from 'react';
import "../../stylesheets/edit-object-card.css"
/// REDUX IMPORTS
import { useDispatch } from 'react-redux'
import {updateExhibitionObject} from "../../actions"
import {removeExhibitionObject} from "../../actions"

function EditObjectCard({exhibit, exhibitId}) {
  // PROPS
  const {artist, date, image, title} = exhibit.art_object
  const {id, order_number, description} = exhibit
  ///-----
  // REDUX
  const dispatch = useDispatch()
  ///-----
  // USESTATES
  const [newDescription, setNewDescription] = useState(description)
  const [newOrderNumber, setNewOrderNumber] = useState(order_number)
  const [saved, setSaved] = useState(false)
  ///-----
  // EVENT HANDLERS
  function handleSubmit(event){
    event.preventDefault()
    const updatedObject = {
      order_number: newOrderNumber,
      description: newDescription
    }
    fetch(`http://localhost:3000/exhibition_objects/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedObject),
    })
    .then((r) => r.json())
    .then((updatedObject) => {
      setSaved(true)
      dispatch(updateExhibitionObject(updatedObject))
    })
  }
  function handleDelete(e) {
    const reduxObj = {exhibitId: exhibitId, objectId: id}
    e.preventDefault()
    fetch(`http://localhost:3000/exhibition_objects/${id}`, {
        method: "DELETE",
    })
    .then(() => {
      dispatch(removeExhibitionObject(reduxObj))
    })
  }
  ///-----

  return (
    <div className="edit-object-card-container" >
      <div className="edit-object-card-top-panel" style={{backgroundImage: `url(${image})`}}>
        <div className="edit-object-card-details">
          <div className="edit-object-card-title">TITLE: {title}</div>
          <div className="edit-object-card-artist">ARTIST: {artist}</div>
          <div className="edit-object-card-date">DATE: {date}</div>
        </div>
      </div>
      <div className="edit-object-card-middle-panel">
        <form className="edit-object-card-form" onSubmit={handleSubmit}>
          <p className="edit-object-card-p">Write a description for this object:</p>
          <textarea className="edit-object-card-description-field"
            name="description" 
            type="text"
            value={newDescription}
            onChange={(e)=>setNewDescription(e.target.value)}/>
          <p className="edit-object-card-p">Set the order you would like this object to appear in the gallery:</p>
          <input  className="edit-object-card-order-number-input"
            name="order-number" 
            type="text" 
            value={newOrderNumber} 
            onChange={(e)=>setNewOrderNumber(e.target.value)}/>
            <p className="empty"></p>
            <div className="button-zone">
              <button type="submit">UPDATE</button>
              <button type="delete" className="edit-object-card-delete" onClick={handleDelete}>REMOVE</button>
              {saved ? <p className="saved">OBJECT UPDATED!</p> : null}
            </div>
        </form>
      </div>
      {/* <div className="edit-object-card-bottom-panel" >
        <a className="met-link" 
            href={`https://www.metmuseum.org/art/collection/search/${met_id}`} 
            target="_blank" 
            rel="noreferrer">Click to see on https://www.metmuseum.org/</a>
      </div> */}
      
    </div>
  );
}

export default EditObjectCard;
