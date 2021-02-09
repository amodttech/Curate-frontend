
const exhibitionsReducer = (state = {}, action) => {
    switch(action.type){
        case 'SETEXHIBITIONS':
            return {...state, ...action.exhibition} 
        case 'ADDTOEXHIBITIONS':
            return {...state, [(action.exhibition.id)-1]: action.exhibition}
        default:
            return state
    }
}

export default exhibitionsReducer

