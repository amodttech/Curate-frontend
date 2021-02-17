
const exhibitionsReducer = (state = {}, action) => {
    switch(action.type){
        case 'SETEXHIBITIONS':
            return {...state, ...action.exhibition} 
        case 'ADDTOEXHIBITIONS':
            return {...state, [(action.exhibition.id)-1]: action.exhibition}
        case 'UPDATEEXHIBITIONS':
            return {...state, [(action.exhibition.id)-1]: action.exhibition}
        case 'REMOVEFROMEXHIBITIONS':
            return {
                ...state, 
                [(action.exhibition.id)-1]: state.filter(item => item != action.exhibition)
            }
        default:
            return state
    }
}

export default exhibitionsReducer

