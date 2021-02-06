import counterReducer from './counter'
import {combineReducers} from 'redux'
import userReducer from "./userSlice";
import setExhibitionsReducer from './setExhibitions';
import isLoggedInReducer from './isLoggedIn'


const allReducers = combineReducers({
    counter: counterReducer, 
    user: userReducer,
    allExhibitions: setExhibitionsReducer,
    loggedIn: isLoggedInReducer

})


export default allReducers