const myState = {
    isLoggedIn: false,
    current_user: {}
};

export const userReducer =  (state = myState, action) => {
    switch (action.type) {

        case 'REGISTERED_USER':
            return state;

        case 'USER_LOGIN':
            return Object.assign(myState,{isLoggedIn: true, current_user: action.payload.user_data});    

        case 'LOGGEDIN':
            return Object.assign(myState,{isLoggedIn: true});    

        default:
            return state;
    }   
}