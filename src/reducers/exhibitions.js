const initialState = {
    exhibitions: []
}

const exhibitionsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SETEXHIBITIONS':
            return {...state, exhibitions: action.payload} 
        case 'ADDTOEXHIBITIONS':
            return {...state,
                exhibitions: [...state.exhibitions, action.payload]
            }
        default:
            return state
    }
}

export default exhibitionsReducer