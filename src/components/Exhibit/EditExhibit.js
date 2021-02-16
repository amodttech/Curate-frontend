import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import '../../stylesheets/exhibit-edit.css'
import EditObjectCard from './EditObjectCard'
/// REDUX IMPORTS
import { useSelector, useDispatch } from 'react-redux'
import {addToExhibitions} from '../../actions'

function EditExhibit({exhibitionObjects, exhibitionData}) {
  let history = useHistory()
  // REDUX
  const dispatch = useDispatch()
  //// ------------
  // USESTATES
  const {id, name, description, theme} = exhibitionData
  const [formName, setFormName] = useState(name)
  const [showDescription, setShowDescription] = useState(description)
  const [displayTheme, setDisplayTheme] = useState(theme)

  //// ------------
  // EVENT HANDLERS
  function handleSubmit(event){
    event.preventDefault()
    const formData = {
      name: formName,
      description: showDescription,
      theme: displayTheme
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
      console.log(data)
      dispatch(addToExhibitions(data))
      history.push(`/exhibitions/${id}`)
    })
    
  }
  

  const exhibitionsComponents = exhibitionObjects.map(exhibit => 
    <EditObjectCard key={exhibit.id} exhibit={exhibit}/>)

  return (
    <div className="exhibit-edit-container">
        <form className="exhibit-edit-form" onSubmit={handleSubmit}>
          <input type="text" id="name" value={formName} onChange={(e) => setFormName(e.target.value)} />
          <input type="text" id="description" value={showDescription} onChange={(e) => setShowDescription(e.target.value)} />
          <select id="theme" value={displayTheme} onChange={(e) => setDisplayTheme(e.target.value)}>
              <option value="" disabled selected>Select a Theme</option>
              <option value="warm">Warm</option>
              <option value="dark">Dark</option>
              <option value="erratic">Erratic</option>
              <option value="sensible">Sensible</option>
          </select>
          <button type="submit">SUBMIT</button>
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