//  TESTER ACTIONS

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


export const setExhibitions = (exhibitObj) => {  ///  Gets all expeditions
    return {
        type: 'SETEXHIBITIONS',
        payload: exhibitObj
    }
}

export const isLoggedIn = () => {  ///  True if user is logged in
    return {
        type: 'LOGGEDIN'
    }
}

export const isLoggedOut = () => {  ///  True if user is logged in
    return {
        type: 'LOGGEDOUT'
    }
}