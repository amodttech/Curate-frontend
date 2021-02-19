import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import '../../stylesheets/profile.css'
import ExhibitCard from '../Exhibit/ExhibitCard'
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
  const allExhibits = Object.values(useSelector((state) => state.exhibitions))
  const userExhibits = allExhibits.filter((exhibit) => exhibit.user_id === user.id)
  //// ------------
  // Exhibit List Map
  const exhibitList = userExhibits.map(exhibit => 
    <ExhibitCard key={exhibit.id} exhibit={exhibit}/>)

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
      <h2>PROFILE</h2>
      <div className="profile-user-details">
        <h3>{user.username}</h3>
        {/* <h3>{user.display_name}</h3> */}
        <p>{user.bio}</p>
        <div onClick={handleEditClick} className="profile-edit-button">EDIT USER DETAILS</div>
      </div>
      {editTog ? <> 
      <p></p>
      <form className="profile-form" onSubmit={handleSubmit}>
          <h2>EDIT PROFILE</h2>
          <h3>USERNAME</h3>
          <input type="text" id="username" value={formUsername} onChange={(e) => setFormUsername(e.target.value)} />
          <h3>PASSWORD</h3>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {/* <h3>NAME</h3>
          <input type="text" id="displayName" value={formName} onChange={(e) => setFormName(e.target.value)} /> */}
          <h3>BIO</h3>
          <input type="text" id="bio" value={formBio} onChange={(e) => setFormBio(e.target.value)} />
          <div className="profile-submit">
            <button type="submit">SUBMIT</button>
            <button type="delete" className="profile-delete" onClick={handleDelete}>DELETE</button>
          </div>
      </form>
      </> : null}
      <ul className="profile-exhibit-list">{exhibitList}</ul>
    </div>
  );
}

export default Profile;