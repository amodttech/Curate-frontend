import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import '../../stylesheets/login.css'

function Login({setLogin, login}) {
  let history = useHistory()

  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    const formData = { username, password }
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    .then((r) => r.json())
    .then((data) => {
        setLogin(data)        
        history.push("/")
    })

    
  }


  console.log(login ? login.display_name : "no login")

  return (
    <div className="login-container">
      <h1>LOGIN</h1>
      <div className="login-form" onSubmit={handleSubmit}>
        <div className="login-label">
          <h3>USERNAME</h3>
        </div>
        <div className="login-input">
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="login-label">
          <h3>PASSWORD</h3>
        </div>
        <div className="login-input">
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="login-submit">
          <button onClick={handleSubmit}>SUBMIT</button>
        </div>
      </div>
    </div>
  );
}

export default Login;