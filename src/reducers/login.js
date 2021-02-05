const loginReducer = (state = 0, action) => {
    switch(action.type){
        case 'LOGIN':
            return state + action.payload;
        case 'LOGOUT':
            return state - 1;
        default:
            return state
    }
}

export default loginReducer