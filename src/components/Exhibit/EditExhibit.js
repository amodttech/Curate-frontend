import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import '../../stylesheets/exhibit-edit.css'
import EditObjectCard from './EditObjectCard'
/// REDUX IMPORTS
import { useDispatch } from 'react-redux'
import {updateExhibitions} from '../../actions'
import {removeFromExhibitions} from '../../actions'

function EditExhibit({exhibitionObjects, exhibitionData}) {
  let history = useHistory()
  // REDUX
  const dispatch = useDispatch()
  //// ------------
  const id = exhibitionData[0]
  const name = exhibitionData[2]
  const description = exhibitionData[3]
  // USESTATES
  const [formName, setFormName] = useState(name)
  const [showDescription, setShowDescription] = useState(description)
  //// ------------
  // EVENT HANDLERS
  function handleSubmit(event){
    event.preventDefault()
    const formData = {
      name: formName,
      description: showDescription,
      theme: null
    }
    fetch(`http://localhost:3000/exhibitions/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    .then((r) => r.json())
    .then((data) => {
      dispatch(updateExhibitions(data))
      history.push(`/exhibitions/${id}`)
    })
  }

  function handleDelete(e) {
    e.preventDefault()
    fetch(`http://localhost:3000/exhibitions/${id}`, {
        method: "DELETE",
    })
    .then(() => {
      history.push("/")
      dispatch(removeFromExhibitions(id))
      
    })
  }
  

  const exhibitionsComponents = exhibitionObjects.map(exhibit => 
    <EditObjectCard key={exhibit.id} exhibit={exhibit} exhibitId={id}/>)

  return (
    <div className="exhibit-edit-container">
        <form className="exhibit-edit-form" onSubmit={handleSubmit}>
          <input type="text" id="name" placeholder="Exhibition Name" value={formName} onChange={(e) => setFormName(e.target.value)} />
          <input type="text" id="description" placeholder="Write a Description" value={showDescription} onChange={(e) => setShowDescription(e.target.value)} />
          <button type="submit">UPDATE</button>
          <button type="delete" className="exhibit-edit-delete" onClick={handleDelete}>DELETE EXHIBITION</button>
        </form>
        <div className="exhibit-edit-body">
          <ul className="exhibit-edit-ul">
            {exhibitionsComponents}
          </ul>
        </div>
    </div>
  );
}

export default EditExhibit;