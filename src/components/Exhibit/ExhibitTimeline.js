import React from 'react';
import '../../stylesheets/exhibit-timeline.css'
// TIMELINE IMPORTS
import Timeline from 'react-image-timeline';
require('react-image-timeline/dist/timeline.css');

function ExhibitTimeline({exhibitionObjects}) {

  let galleryReadyObjectArray = []
  if (exhibitionObjects) {
    galleryReadyObjectArray = exhibitionObjects.map((exhibitionObject) => 
    ({
    object: exhibitionObject,
    date: new Date(exhibitionObject.art_object.date), 
    title: exhibitionObject.art_object.title,
    buttonText: "click me",
    imageUrl: exhibitionObject.art_object.image,
    onClick: console.log("YES")
    })
  )} 


  function dateTranslate(dateData){
    /*  possible date formats
    ca. 1864
    ca. 1820–22
    ca. 945–715 B.C.
    1327–1295 BC
    4th or 3rd century B.C.
    ca. 7th–6th century B.C.

    */
  }

  // const events = [
  //   {
  //       date: new Date(1987, 7, 31),
  //       text: "World Celebrates",
  //       title: "Aaron Birth",
  //       buttonText: 'REJOICE',
  //       imageUrl: "https://live.staticflickr.com/849/43798505612_68581b0bf6_h.jpg",
  //       onClick: console.log("YES"),
  //   }
  // ]


  return (
    <div className="exhibit-timeline-container">
      <Timeline events={galleryReadyObjectArray} />
    </div>
  );
}

export default ExhibitTimeline;
