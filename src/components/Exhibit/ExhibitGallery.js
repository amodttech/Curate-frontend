import React from 'react';
import '../../stylesheets/exhibit-gallery.css'
import Carousel from 'react-elastic-carousel'


function ExhibitGallery({exhibitionObjects}) {
  // PROPS
  let galleryReadyObjectArray = []
  let presortedObjectsList = []
  if (exhibitionObjects) {
    presortedObjectsList = exhibitionObjects.map((exhibitionObject) => (
      {...exhibitionObject.art_object, 
        order_number: exhibitionObject.order_number, 
        description: exhibitionObject.description}
      ))
    galleryReadyObjectArray = presortedObjectsList.sort((a, b) => {
      return a.order_number - b.order_number
    })
  }  
  ///-----

  return (
      <div className="exhibit-gallery-carousel">
        <Carousel>
          {galleryReadyObjectArray.map(item => 
            <div className="exhibit-gallery-slide" key={item.id}>

              <div className="exhibit-gallery-slide-vitals">
                <p className="exhibit-gallery-slide-link">
                  <a href={`https://www.metmuseum.org/art/collection/search/${item.met_id}`} target="_blank" rel="noopener noreferrer">↗️</a>
                </p>
                <p className="exhibit-gallery-slide-title">{item.title}</p>
                <p className="exhibit-gallery-slide-artist">{item.artist}</p>
                <p className="exhibit-gallery-slide-date">{item.date}</p>
                <p className="exhibit-gallery-slide-origin">{item.origin}</p>
              </div>
              <div className="exhibit-gallery-slide-content">
                {(item.description === (null || "")) 
                ? <div className="exhibit-gallery-slide-nodescription">
                    <a href={item.image} target="_blank" rel="noopener noreferrer"><img className="nodescription-image" src={item.image} alt={item.title}/></a>
                  </div>
                : <>
                <div className="exhibit-gallery-slide-withdescription">
                  <div className="slide-left">
                    <a href={item.image} target="_blank" rel="noopener noreferrer"><img className="description-image" src={item.image} alt={item.title}/></a>
                  </div>
                  <div className="slide-right">
                    <p className="description-p">{item.description}</p>
                  </div>
                </div></>}
              </div>
            </div>)}
        </Carousel>
      </div>
  );
}

export default ExhibitGallery;
