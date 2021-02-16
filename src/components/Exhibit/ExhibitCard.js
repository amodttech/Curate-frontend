import React from 'react';
import '../../stylesheets/exhibit-card.css'

import { Link } from 'react-router-dom';

function ExhibitCard({exhibit}) {
  const {id, name, description, exhibition_objects} = exhibit

  return (
    <Link to={`/exhibitions/${id}`}>
      <div className="exhibit-card">
        <h2>{name}</h2>
        <p>{description}</p>
        <img src={exhibition_objects[0].art_object.image} alt={name} />
      </div>
    </Link>
  );
}

export default ExhibitCard;