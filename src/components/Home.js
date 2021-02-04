import React from 'react';
import '../stylesheets/home.css'

function Home({login}) {

  const display_name = login.display_name || ''

  return (
    <div className="home-container">
      <h1>Welcome Home{display_name ? `, ${display_name}` : null}</h1>
    </div>
  );
}

export default Home;