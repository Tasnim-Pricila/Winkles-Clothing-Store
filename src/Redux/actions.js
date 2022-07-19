import Api from "../Axios/Api"
import actionTypes from "./constants"

export const fetchProducts = () => {
    return async (dispatch) => {
        const response = await Api.get('/products')
        dispatch({
            type: actionTypes.FETCH_PRODUCTS,
            payload: response.data
        })
    }
}

export const fetchProduct = (id) => {
    return async (dispatch) => {
        const response = await Api.get(`/product/${id}`)
        dispatch({
            type: actionTypes.FETCH_PRODUCT,
            payload: response.data
        })
    }
}

export const removeSelectedProduct = () => {
    return {
        type: actionTypes.REMOVE_SELECTED_PRODUCT,
    }
}

export const addToCart = (itemID) => {
    return {
        type: actionTypes.ADD_TO_CART,
        payload: {
            id: itemID
        }
    }
}
export const removeFromCart = (itemID) => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        payload: {
            id: itemID
        }
    }
}
export const adjustQty = (itemID, qty) => {
    return {
        type: actionTypes.ADJUST_QTY,
        payload: {
            id: itemID,
            qty: qty
        }
    }
}
export const getUsers = () => {
    return async (dispatch) => {
        const response = await Api.get(`/users`)
        dispatch({
            type: actionTypes.GET_USERS,
            payload: response.data
        })
       
    }
}

