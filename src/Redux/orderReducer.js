import actionTypes from "./constants";

const initialState = {
    orders: [],
    allOrder: []
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_ORDER:
            return {
                ...state,
                orders: action.payload
            }
        case actionTypes.GET_ORDER_BY_EMAIl:
            console.log(action.payload);
            return {
                ...state,
                orders: action.payload
            }
        case actionTypes.GET_ALL_ORDER:
            console.log(action.payload);
            return {
                ...state,
                allOrder: action.payload
            }
        default:
            return state
    }
}