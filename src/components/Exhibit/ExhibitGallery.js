import React from 'react';
import '../../stylesheets/exhibit-gallery.css'
import Carousel from 'react-elastic-carousel'


function ExhibitGallery({exhibitionObjects}) {
 
  console.log(exhibitionObjects)


  const state = {
    items: [
      {id: 1, title: 'item #1'},
      {id: 2, title: 'item #2'},
      {id: 3, title: 'item #3'},
      {id: 4, title: 'item #4'},
      {id: 5, title: 'item #5'},
      // {id: 1, met_id: 548946, title: "Bread", artist: "", date: "ca. 1479–1458 B.C."}

    ]
  }

  const gallery = {
    items: []
  }

  return (
    <div className="exhibit-gallery-container">

      <div className="exhibit-gallery-carousel">
        <Carousel>
        {state.items.map(item => <div className="exhibit-gallery-carousel-card" key={item.id}>{item.title}</div>)}
        </Carousel>
      </div>
    </div>
  );
}

export default ExhibitGallery;