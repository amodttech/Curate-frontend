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
 

  // const state = {
  //   items: [
  //     {id: 1, title: 'item #1'},
  //     {id: 2, title: 'item #2'},
  //     {id: 3, title: 'item #3'},
  //     {id: 4, title: 'item #4'},
  //     {id: 5, title: 'item #5'},

  //   ]
  // }

  // const gallery = {
  //   items: []
  // }

  return (
    <div className="exhibit-gallery-container">

      <div className="exhibit-gallery-carousel">
        <Carousel>
        {newArr.map(item => <div className="exhibit-gallery-carousel-card" key={item.id}>{item.title} {item.date}</div>)}
        </Carousel>
      </div>
    </div>
  );
}

export default ExhibitGallery;