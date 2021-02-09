import React from 'react';
import { useHistory, useLocation } from "react-router-dom";
import '../../stylesheets/exhibit-gallery.css'
import Carousel from 'react-elastic-carousel'

/// REDUX IMPORTS
import { useSelector, useDispatch } from 'react-redux'
/// COMPONENTS
import ObjectCard from '../Object/ObjectCard'

function ExhibitGallery({exhibitionData}) {
  console.log(exhibitionData)
  const {id, name, theme, description, exhibition_objects} = exhibitionData

  const state = {
    items: [
      {id: 1, title: 'item #1'},
      {id: 2, title: 'item #2'},
      {id: 3, title: 'item #3'},
      {id: 4, title: 'item #4'},
      {id: 5, title: 'item #5'}
    ]
  }

  return (
    <div className="exhibit-gallery-container">
      {name}, {description}
      <div className="exhibit-gallery-carousel">
        <Carousel>
        {state.items.map(item => <div className="exhibit-gallery-carousel-card" key={item.id}>{item.title}</div>)}
        </Carousel>
      </div>
    </div>
  );
}

export default ExhibitGallery;