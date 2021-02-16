import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import '../../stylesheets/profile.css'
/// REDUX IMPORTS
import {useDispatch, useSelector} from 'react-redux'
import { setId, setDisplayName, setBio, addExhibitions, setUsername } from '../../reducers/userSlice'
import {isLoggedIn} from '../../actions'
import {isLoggedOut} from '../../actions'

function Profile() {
  let history = useHistory()
  // REDUX
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const loggedIn = useSelector((state) => state.loggedIn)
  //// ------------
  // USESTATES
  const [formUsername, setFormUsername] = useState(user.username)
  const [password, setPassword] = useState(user.password)
  const [formName, setFormName] = useState(user.display_name)
  const [formBio, setFormBio] = useState(user.bio)
  const [editTog, setEditTog] = useState(false)
  // HANDLERS
  function handleDelete(e) {
    e.preventDefault()
    fetch(`http://localhost:3000/users/${user.id}`, {
        method: "DELETE",
    })
    .then(() => {
      dispatch(isLoggedOut())
      dispatch(setId(null))
      dispatch(setDisplayName(""))
      dispatch(setBio(""))
      dispatch(addExhibitions(""))
      dispatch(setUsername(""))
      history.push("/")
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const formData = {
        username: formUsername,
        password: password,
        display_name: formName,
        bio: formBio
    }
    fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
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
        history.push("/profile")
    })
  }
  function handleEditClick(){
    setEditTog(!editTog)
  }
  //// ------------
  return (
    <div className="profile-container">
      <h1>PROFILE</h1>
      <div className="profile-user-details">
        <h3>{user.username}</h3>
        <h3>{user.display_name}</h3>
        <h3>{user.bio}</h3>
        <div onClick={handleEditClick} className="profile-edit-button">EDIT USER DETAILS</div>
      </div>
      {editTog ? <> 
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>EDIT PROFILE</h2>
        <div className="profile-label">
          <h3>USERNAME</h3>
        </div>
        <div className="profile-input">
          <input type="text" id="username" value={formUsername} onChange={(e) => setFormUsername(e.target.value)} />
        </div>
        <div className="profile-label">
          <h3>PASSWORD</h3>
        </div>
        <div className="profile-input">
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="profile-label">
          <h3>NAME</h3>
        </div>
        <div className="profile-input">
          <input type="text" id="displayName" value={formName} onChange={(e) => setFormName(e.target.value)} />
        </div>
        <div className="profile-label">
          <h3>BIO</h3>
        </div>
        <div className="profile-input">
          <input type="text" id="bio" value={formBio} onChange={(e) => setFormBio(e.target.value)} />
        </div>
        <div className="profile-submit">
          <button type="submit">SUBMIT</button>
          <button type="delete" className="profile-delete" onClick={handleDelete}>DELETE</button>
        </div>
      </form>
      </> : null}
      
    </div>
  );
}

export default Profile;