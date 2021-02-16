import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import '../../stylesheets/exhibit-new.css'
/// COMPONENTS

/// REDUX IMPORTS
import { useSelector, useDispatch } from 'react-redux'
import {addToExhibitions} from '../../actions'


function NewExhibit() {
  let history = useHistory()
  // REDUX
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  //// ------------
  // USESTATES
  const [showName, setShowName] = useState("")
  const [showDescription, setShowDescription] = useState("")
  // const [displayTheme, setDisplayTheme] = useState("")
  //// ------------
  // EVENT HANDLERS
  function handleSubmit(e){
    e.preventDefault()
    const formData = {
      user_id: user.id,
      name: showName,
      description: showDescription,
      // theme: displayTheme
      theme: null
    }
    fetch("http://localhost:3000/exhibitions/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    .then((r) => r.json())
    .then((data) => {
      dispatch(addToExhibitions(data))
      history.push(`/exhibitions/${data.id}`)
    })
  }



  return (
    <div className="exhibit-new-container">
      <h1>New Exhibition</h1>
      <form className="exhibit-new-form" onSubmit={handleSubmit}>
        <div className="exhibit-new-label">
          <h3>What's the title of your show?</h3>
        </div>
        <div className="exhibit-new-label">
          <input type="text" id="name" value={showName} onChange={(e) => setShowName(e.target.value)} />
        </div>
        <div className="exhibit-new-label">
          <h3>Give it a thoughtful description</h3>
        </div>
        <div className="exhibit-new-label">
          <input type="text" id="description" value={showDescription} onChange={(e) => setShowDescription(e.target.value)} />
        </div>
        {/* <div className="exhibit-new-label">
          <h3>What kind of theme would you like for the display?</h3>
        </div>
        <div className="exhibit-new-dropdown">
          <select id="theme" onChange={(e) => setDisplayTheme(e.target.value)}>
            <option value="warm">Warm</option>
            <option value="dark">Dark</option>
            <option value="erratic">Erratic</option>
            <option value="sensible">Sensible</option>
          </select>
        </div> */}
        <div className="login-submit">
          <button type="submit">SUBMIT</button>
        </div>
      </form>




    </div>
  );
}

export default NewExhibit;