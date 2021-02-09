import React from 'react';
import '../../stylesheets/exhibit-menu.css'
import { useHistory } from "react-router-dom";
/// REDUX IMPORTS
import { useSelector, useDispatch } from 'react-redux'

function Exhibit() {
    const history = useHistory();
    // REDUX
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const exhibitionsList = Object.values(useSelector((state) => state.exhibitions))
    console.log(exhibitionsList)
    //// ------------
    // USESTATES
    // const [exhibitionsList, setExhibitionsList] = useState([])
    //// ------------
    // HANDLERS
    function handleClick(event){
        console.log('click: ' + event.target.id)
        const exhibitID = event.target.id
        history.push(`/exhibitions/${exhibitID}`)
    }
    //// ------------
    // HELPERS
    const userExhibitions = exhibitionsList.filter(exhibit => 
        exhibit.user_id === user.id)
    //// ------------
    // EXHIBIT LIST RENDERER
    const exhibitionsComponents = userExhibitions.map(exhibit => 
        <li id={exhibit.id} 
            className="exhibit-menu-li"
            onClick={(event) => handleClick(event)}>
            {exhibit.name} | 
            <span className="exhibit-menu-description"> {exhibit.description}</span>
        </li>)
    //// ------------




  return (
    <div className="exhibit-menu-container">
        Select an Exhibition:
        <ul className="exhibit-menu-ul">
            {exhibitionsComponents}
        </ul>
    </div>
  );
}

export default Exhibit;