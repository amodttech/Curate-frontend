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
  const [error, setError] = useState(false)
  // HANDLERS
  function handleSubmit(e) {
    e.preventDefault()
    const formData = { username: formUsername, password: password }
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    })
    .then(r => r.json())
    .then(response => {
      if (response.status === "error"){
        setError(true)
      }
      else{
        setError(false)
        userState(response)
      }
    })
  }

  function userState(userObj){
        dispatch(isLoggedIn())
        dispatch(setId(userObj.id))
        dispatch(setDisplayName(userObj.display_name))
        dispatch(setBio(userObj.bio))
        dispatch(addExhibitions(userObj.exhibitions))
        dispatch(setUsername(userObj.username))
        history.push("/")
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
          {error ? <p className="error">user dont exist</p> : null}
      </form>
    </div>
  );
}

export default Login;