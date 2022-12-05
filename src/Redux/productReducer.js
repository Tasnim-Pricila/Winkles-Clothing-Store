import actionTypes from "./constants";

const initialState = {
    products: [],
    cart: [],
    filter: []
}
const singleState = {
    product: [],
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case actionTypes.ADD_TO_CART:
            // get the items data from the products array
            const item = state.products.find(product => product._id === action.payload.id)
            // check if the item is in cart or not 
            const inCart = state.cart.find(item =>
                item._id === action.payload.id ? true : false)
            return {
                ...state,
                cart: inCart ?
                    state.cart.map(item =>
                        item._id === action.payload.id ?
                            { ...item, qty: item.qty + 1 } :
                            item
                    )
                    :
                    [...state.cart, { ...item, qty: 1 }]
            }
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(prod => prod._id !== action.payload.id)
            }
        case actionTypes.ADJUST_QTY:
            return {
                ...state,
                cart: state.cart.map(item =>
                    item._id === action.payload.id ?
                        { ...item, qty: action.payload.qty } :
                        item
                )
            }
        case actionTypes.SEARCH_BY_FILTER:
            return {
                ...state,
                products: action.payload,
            }
        default:
            return state
    }
};

const singleProductReducer = (state = singleState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        case actionTypes.REMOVE_SELECTED_PRODUCT:
            return {

            }
        default:
            return state
    }
}

export { productReducer, singleProductReducer };