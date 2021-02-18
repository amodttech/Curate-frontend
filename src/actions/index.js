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
        exhibition: exhibitObj
    }
}
export const addToExhibitions = (exhibitionObj) => { 
    return {
        type: 'ADDTOEXHIBITIONS',
        exhibition: exhibitionObj
    }
}

export const updateExhibitions = (exhibitionObj) => { 
    return {
        type: 'UPDATEEXHIBITIONS',
        exhibition: exhibitionObj
    }
}

export const removeFromExhibitions = (exhibitionId) => { 
    return {
        type: 'REMOVEFROMEXHIBITIONS',
        exhibition: exhibitionId
    }
}

export const addExhibitionObject = (exhibitionObject) => { 
    return {
        type: 'ADDEXHIBITIONOBJECT',
        exhibitionObject: exhibitionObject
    }
}

export const updateExhibitionObject = (exhibitionObject) => { 
    return {
        type: 'UPDATEEXHIBITIONOBJECT',
        exhibitionObject: exhibitionObject
    }
}
export const removeExhibitionObject = (id) => { 
    return {
        type: 'REMOVEEXHIBITIONOBJECT',
        exhibitionObject: id
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


