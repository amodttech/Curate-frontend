import counterReducer from './counter'
import loggedReducer from './isLogged'
import {combineReducers} from 'redux'
import loginReducer from './login'
import userReducer from "./userSlice";
import firstExhibitionsReducer from './firstExhibitions';


const allReducers = combineReducers({
    counter: counterReducer, 
    isLogged: loggedReducer, 
    login: loginReducer,
    user: userReducer,
    allExhibitions: firstExhibitionsReducer

})


export default allReducers