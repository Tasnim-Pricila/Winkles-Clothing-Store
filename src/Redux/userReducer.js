import actionTypes from "./constants";

const initialState = {
   users : [],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USERS:
            return {
                ...state,
                users: action.payload
            }
       
        default:
            return state
    }
}

export { userReducer };