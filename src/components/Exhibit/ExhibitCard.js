import React from 'react';
import '../../stylesheets/exhibit-card.css'

import { Link } from 'react-router-dom';

function ExhibitCard({key, exhibit}) {

  const {id, name, description, theme} = exhibit

  return (
    <>
      <div className="exhibit-card">
        <Link to={`/exhibitions/${id}`}>
          <h2>{name}</h2>
        </Link>
        <p>{description}</p>
      </div>
    </>
  );
}

export default ExhibitCard;