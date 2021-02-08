import counterReducer from './counter'
import {combineReducers} from 'redux'
import userReducer from "./userSlice";
import exhibitionsReducer from './exhibitions';
import isLoggedInReducer from './isLoggedIn'
import currentExhibitionReducer from './currentExhibition';



const allReducers = combineReducers({
    counter: counterReducer, 
    user: userReducer,
    exhibitions: exhibitionsReducer,
    loggedIn: isLoggedInReducer,
    currentExhibition: currentExhibitionReducer,
})


export default allReducers