import actionTypes from "./constants";

const initialState = {
    orders: [],
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_ORDER:
            return {
                ...state,
                orders: action.payload
            }
        default:
            return state
    }
}