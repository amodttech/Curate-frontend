import React from 'react';
import '../../stylesheets/exhibit-gallery.css'
import Carousel from 'react-elastic-carousel'


function ExhibitGallery({exhibitionObjects}) {
 
  console.log("exhibitionObjects", exhibitionObjects)

  let galleryReadyObjectArray = []
  if (exhibitionObjects) {
    galleryReadyObjectArray = exhibitionObjects.map((exhibitionObject) => ({...exhibitionObject.art_object, order_number: exhibitionObject.order_number}))
  } 

  // console.log('newArr', newArr)

  // <div className="card-details"> 
  // {item.title} {item.date} {item.artist} {item.image}  {item.description}
  
  // </div>

 

  return (
      <div className="exhibit-gallery-carousel">
        <Carousel>
          {galleryReadyObjectArray.map(item => 
          <div className="exhibit-gallery-slide" key={item.id}>
            <div>{item.title}</div>
            {item.artist ? <div>{item.artist}</div> : null}
            <div>{item.date}</div>
            <img className="exhibit-gallery-slide-image" src={item.image} />
          </div>)}
        </Carousel>
      </div>
  );
}

export default ExhibitGallery;