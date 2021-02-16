import React from 'react';
import '../../stylesheets/exhibit-gallery.css'
import Carousel from 'react-elastic-carousel'


function ExhibitGallery({exhibitionObjects}) {
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

  console.log('galleryReadyObjectArray', galleryReadyObjectArray)
  return (
      <div className="exhibit-gallery-carousel">
        <Carousel>
          {galleryReadyObjectArray.map(item => 
            <div className="exhibit-gallery-slide" key={item.id}>

              <div className="exhibit-gallery-slide-vitals">

              <p className="exhibit-gallery-slide-title">{item.title}</p>
              <p className="exhibit-gallery-slide-artist">{item.artist}</p>
              <p className="exhibit-gallery-slide-date">{item.date}</p>




              </div>
              <div className="exhibit-gallery-slide-content">
                {(item.description === "") 
                ? <div className="exhibit-gallery-slide-nodescription">
                    <a href={item.image}><img src={item.image} alt={item.title}/></a>
                  </div>
                
                : <>
                <div className="exhibit-gallery-slide-withdescription">
                  <div className="slide-left">
                    <a href={item.image}><img src={item.image} alt={item.title}/></a>
                  </div>
                  <div className="slide-right">
                    {item.description}
                  </div>
                </div></>}


              </div>
            </div>)}
        </Carousel>
      </div>
  );
}

export default ExhibitGallery;

/*


              <div>{item.title}</div>
              {item.artist ? <div>{item.artist}</div> : null}
              <div>{item.date}</div>

              {(item.description === "") 
              ? <img src={item.image} alt={item.title}/>
              : <>
              <div>
                <div><img src={item.image} alt={item.title}/></div>
                <div>{item.description}</div>
              </div></>}
              
              

              
              






*/