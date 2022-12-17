import actionTypes from "./constants";

const initialState = {
   users : [],
   user:[]
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case actionTypes.GET_ME:
            console.log(action.payload);
            return {
                ...state,
                user: action.payload
            }
      
       
        default:
            return state
    }
}

export { userReducer };