import React, {useState} from 'react';
import "../../stylesheets/edit-object-card.css"

function EditObjectCard({exhibit}) {
 
  console.log('exhibit', exhibit)
  const {artist, date, image, met_id, title} = exhibit.art_object
  const {id, order_number, description} = exhibit

  const [newDescription, setNewDescription] = useState(description)
  const [newOrderNumber, setNewOrderNumber] = useState(order_number)
  const [saved, setSaved] = useState(false)

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
    .then((data) => {
      setSaved(true)
      // dispatch(addToExhibitions(data))
      // history.push(`/exhibitions/${id}`)
    })
    
  }

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
          <input className="edit-object-card-order-number-input" 
            name="order-number" 
            type="text" 
            value={newOrderNumber} 
            onChange={(e)=>setNewOrderNumber(e.target.value)}/>
            <button className="edit-object-card-form-button" type="submit">UPDATE</button>
          {saved ? <p className="saved">object updated!</p> : null}
        </form>
      </div>
      <div className="edit-object-card-bottom-panel" >
        <a className="met-link" 
            href={`https://www.metmuseum.org/art/collection/search/${met_id}`} 
            target="_blank" 
            rel="noreferrer">Click to see on https://www.metmuseum.org/</a>
      </div>
      
    </div>
  );
}

export default EditObjectCard;
