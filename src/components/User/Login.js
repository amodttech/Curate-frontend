import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import '../../stylesheets/login.css'
/// COMPONENTS

/// REDUX IMPORTS
import {useDispatch} from 'react-redux'
import { setId, setDisplayName, setBio, addExhibitions, setUsername } from '../../reducers/userSlice'
import {isLoggedIn} from '../../actions'

function Login() {
  let history = useHistory()
  // REDUX
  const dispatch = useDispatch()
  //// ------------
  // USESTATES
  const [formUsername, setFormUsername] = useState(null)
  const [password, setPassword] = useState(null)
  // HANDLERS
  function handleSubmit(e) {
    e.preventDefault()
    const formData = { formUsername, password }
    fetch("http://localhost:3000/login", {
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
        dispatch(setDisplayName(userObj.display_name))
        dispatch(setBio(userObj.bio))
        dispatch(addExhibitions(userObj.exhibitions))
        dispatch(setUsername(userObj.username))
        history.push("/")
    })
  }
  //// ------------

  return (
    <div className="login-container">
      <h2>LOGIN</h2>
      <p></p>
      <form className="login-form" onSubmit={handleSubmit}>
          <h3>USERNAME</h3>
          <input className="login-input" type="text" id="username" value={formUsername} onChange={(e) => setFormUsername(e.target.value)} />
          <h3>PASSWORD</h3>
          <input className="login-input" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <p></p>
          <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}

export default Login;