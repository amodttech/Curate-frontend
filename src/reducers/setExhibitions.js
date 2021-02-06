const setExhibitionsReducer = (state = [], action) => {
    switch(action.type){
        case 'SETEXHIBITIONS':
            return state.exhibitions = action.payload
        default:
            return state
    }
}

export default setExhibitionsReducer
