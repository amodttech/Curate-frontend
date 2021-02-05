//import 
import {createStore} from "redux"


//  Store  => Global State


//  Action  || describe the function that returns an object
const increment = () => {
  return {type: 'INCREMENT'}
}

const decrement = () => {
  return {
    type: 'DECREMENT'
  }
}


// Reducer
const counter = (state = 0, action) => {
  switch(action.type){
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
  }
}

let store = createStore(counter)

  //Display in Console
store.subscribe(() => console.log(store.getState()))

// Dispatch
store.dispatch(increment())




