import React from 'react';
import '../../stylesheets/exhibit-card.css'

import { Link } from 'react-router-dom';

function ExhibitCard({exhibit}) {
  const {id, name, description, exhibition_objects} = exhibit

  return (
    <Link to={`/exhibitions/${id}`}>
      <div className="exhibit-card">
        <h3 className="card-name">{name}</h3>
        <p className="card-description">{description}</p>
        <div className="image-container">
          <img className="card-image" src={exhibition_objects[0].art_object.image} alt={name} />
        </div>
      </div>
    </Link>
  );
}

export default ExhibitCard;