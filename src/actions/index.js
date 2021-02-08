//  TESTER ACTIONS
// counter.js
export const increment = nr => {
    return {
        type: 'INCREMENT',
        payload: nr
    }
}
export const decrement = () => {
    return {
        type: 'DECREMENT'
    }
}

//  REAL ACTIONS
// expeditions.js
export const setExhibitions = (exhibitObj) => {  
    return {
        type: 'SETEXHIBITIONS',
        payload: exhibitObj
    }
}
export const addToExhibitions = (exhibitionObj) => { 
    return {
        type: 'ADDTOEXHIBITIONS',
        payload: exhibitionObj
    }
}

// isLoggedIn.js
export const isLoggedIn = () => {  
    return {
        type: 'LOGGEDIN'
    }
}
export const isLoggedOut = () => {  
    return {
        type: 'LOGGEDOUT'
    }
}

// currentExhibition.js
export const currentExhibition = (exhibitionObj) => { 
    return {
        type: 'CURRENTEXHIBITION',
        payload: exhibitionObj
    }
}


