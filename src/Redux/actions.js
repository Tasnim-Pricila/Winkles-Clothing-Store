import Api from "../Axios/Api"
import actionTypes from "./constants"

export const fetchProducts = () => {
    return async (dispatch) => {
        const response = await Api.get('/products')
        // console.log(response);
        dispatch({
            type: actionTypes.FETCH_PRODUCTS,
            payload: response.data?.data?.result
        })
    }
}

export const fetchProduct = (id) => {
    return async (dispatch) => {
        const response = await Api.get(`/products/${id}`)
        console.log(response.data.data);
        dispatch({
            type: actionTypes.FETCH_PRODUCT,
            payload: response.data?.data
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

export const searchByFilter = (url) => {
    return async (dispatch) => {
        console.log(url);
        const response = await Api.get(url)
        dispatch({
            type: actionTypes.SEARCH_BY_FILTER,
            payload: response.data?.data?.result
        })
    }
}