const currentExhibitionReducer = (state = null, action) => {
    switch(action.type){
        case 'CURRENTEXHIBITION':
            return state.currentExhibition = action.payload
        default:
            return state
    }
}

export default currentExhibitionReducer