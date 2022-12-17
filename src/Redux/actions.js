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
        // console.log(response.data.data);
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

export const searchProducts = (text) => {
    return {
        type: actionTypes.SEARCH_PRODUCT,
        payload: {
            searchText: text
        }
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

export const postOrders = (data) => {
    return async (dispatch) => {
        const response = await Api.post(`/orders`, data)
        dispatch({
            type: actionTypes.POST_ORDER,
            payload: response.data?.data
        })
    }
}
export const getMe = () => {
    return async (dispatch) => {
        try {
            const response = await Api.get(`/users/me`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            console.log(response);
            if (response.data.status === 'success') {
                dispatch({
                    type: actionTypes.GET_ME,
                    payload: response.data.data
                })
            }
        } catch (error) {
            console.log(error.response.data.status)
            if(error.response.data.status === 'fail'){
                dispatch({
                    type: actionTypes.GET_ME,
                    payload: []
                })
            }
        }



    }
}
