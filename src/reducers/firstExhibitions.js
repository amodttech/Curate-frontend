const initialState = {
    exhibitions: []
}


const firstExhibitionsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'FIRSTEXHIBITIONS':
            return state.exhibitions = action.payload
        default:
            return state
    }
}

export default firstExhibitionsReducer
