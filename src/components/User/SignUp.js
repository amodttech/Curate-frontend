import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import '../../stylesheets/signup.css'
/// REDUX IMPORTS
import {useDispatch} from 'react-redux'
import { setId, setDisplayName, setBio, addExhibitions, setUsername } from '../../reducers/userSlice'
import {isLoggedIn} from '../../actions'

function SignUp() {
  let history = useHistory()
  // REDUX
  const dispatch = useDispatch()
  //// ------------
  // USESTATES
  const [formUsername, setFormUsername] = useState(null)
  const [password, setPassword] = useState(null)
  // const [formName, setFormName] = useState(null)
  const [formBio, setFormBio] = useState(null)
  // HANDLERS
  function handleSubmit(e) {
    e.preventDefault()
    const formData = {
        username: formUsername,
        password: password,
        // display_name: formName,
        bio: formBio
    }
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    .then((r) => r.json())
    .then((userObj) => {
        dispatch(isLoggedIn())
        dispatch(setId(userObj.id))
        // dispatch(setDisplayName(userObj.display_name))
        dispatch(setBio(userObj.bio))
        dispatch(addExhibitions(userObj.exhibitions))
        dispatch(setUsername(userObj.username))
        history.push("/profile")
    })
  }
  //// ------------
  return (
    <div className="signup-container">
      <h2>CREATE NEW ACCOUNT</h2>
      <p></p>
      <form className="signup-form" onSubmit={handleSubmit}>
          <h3>USERNAME</h3>
          <input className="signup-input" type="text" id="username" value={formUsername} onChange={(e) => setFormUsername(e.target.value)} />
          <h3>PASSWORD</h3>
          <input className="signup-input" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {/* <h3>NAME</h3>
          <input className="signup-input" type="text" id="username" value={formName} onChange={(e) => setFormName(e.target.value)} /> */}
          <h3>BIO</h3>
          <input className="signup-input" type="text" id="username" value={formBio} onChange={(e) => setFormBio(e.target.value)} />
          <p></p>
          <button type="submit" className="signup-submit">SUBMIT</button>
      </form>
    </div>
  );
}

export default SignUp;