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


export const firstExhibitions = (exhibitObj) => {
    return {
        type: 'FIRSTEXHIBITIONS',
        payload: exhibitObj
    }
}