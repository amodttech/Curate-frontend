import React from 'react';
import '../../stylesheets/exhibit-gallery.css'
import Carousel from 'react-elastic-carousel'


function ExhibitGallery({exhibitionObjects}) {
 
  console.log("exhibitionObjects", exhibitionObjects)

  let newArr = []
  if (exhibitionObjects) {
      newArr = exhibitionObjects.map((exhibitionObject) => ({...exhibitionObject.art_object, order_number: exhibitionObject.order_number}))
  } 

  console.log('newArr', newArr)

  // <div className="card-details"> 
  // {item.title} {item.date} {item.artist} {item.image}  {item.description}
  
  // </div>

  
 

  return (
    <div className="exhibit-gallery-container">
      <div className="exhibit-gallery-carousel">
        <Carousel>
          {newArr.map(item => 
          <div className="exhibit-gallery-carousel-card" key={item.id}>
            <div className="exhibit-gallery-carousel-card-title">{item.title}</div>
            {item.artist ? <div className="exhibit-gallery-carousel-card-artist">{item.artist}</div> : null}
            <div className="exhibit-gallery-carousel-card-date">{item.date}</div>
            <img className="exhibit-gallery-carousel-card-img" src={item.image} />
          </div>)}
        </Carousel>
      </div>
    </div>
  );
}

export default ExhibitGallery;