import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import '../../stylesheets/exhibit-edit.css'
import EditObjectCard from './EditObjectCard'
/// REDUX IMPORTS
import { useDispatch } from 'react-redux'
import {updateExhibitions} from '../../actions'
import {removeFromExhibitions} from '../../actions'
import {addToExhibitions} from '../../actions'

function EditExhibit({exhibitionObjects, exhibitionData, setExhibitionData}) {
  let history = useHistory()
  // REDUX
  const dispatch = useDispatch()
  //// ------------
  // USESTATES
  const {id, name, description} = exhibitionData
  const [formName, setFormName] = useState(name)
  const [showDescription, setShowDescription] = useState(description)
  // const [displayTheme, setDisplayTheme] = useState(theme)

  //// ------------
  // EVENT HANDLERS
  function handleSubmit(event){
    event.preventDefault()
    const formData = {
      name: formName,
      description: showDescription,
      theme: null
      // theme: displayTheme
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
      setExhibitionData(data)
      history.push(`/exhibitions/${id}`)
    })
  }

  function handleDelete(e) {
    e.preventDefault()
    fetch(`http://localhost:3000/exhibitions/${id}`, {
        method: "DELETE",
    })
    .then(() => {
      dispatch(removeFromExhibitions(id))
      history.push("/")
    })
  }
  

  const exhibitionsComponents = exhibitionObjects.map(exhibit => 
    <EditObjectCard key={exhibit.id} exhibit={exhibit}/>)

  return (
    <div className="exhibit-edit-container">
        <form className="exhibit-edit-form" onSubmit={handleSubmit}>
          <input type="text" id="name" value={formName} onChange={(e) => setFormName(e.target.value)} />
          <input type="text" id="description" value={showDescription} onChange={(e) => setShowDescription(e.target.value)} />
          {/* <select id="theme" value={displayTheme} onChange={(e) => setDisplayTheme(e.target.value)}>
              <option value="" disabled selected>Select a Theme</option>
              <option value="warm">Warm</option>
              <option value="dark">Dark</option>
              <option value="erratic">Erratic</option>
              <option value="sensible">Sensible</option>
          </select> */}
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