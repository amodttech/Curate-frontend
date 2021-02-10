import React from 'react';
import '../../stylesheets/exhibit-timeline.css'
// TIMELINE IMPORTS
import Timeline from 'react-image-timeline';
require('react-image-timeline/dist/timeline.css');

function ExhibitTimeline({exhibitionData}) {
  
  // const {id, name, theme, description, exhibition_objects} = exhibitionData

  const events = [
    {
        date: new Date(1987, 7, 31),
        text: "World Celebrates",
        title: "Aaron Birth",
        buttonText: 'REJOICE',
        imageUrl: "https://live.staticflickr.com/849/43798505612_68581b0bf6_h.jpg",
        onClick: console.log("YES"),
    }
  ]


  return (
    <div className="exhibit-timeline-container">
      <Timeline events={events} />
    </div>
  );
}

export default ExhibitTimeline;
