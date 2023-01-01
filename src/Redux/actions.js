import Api from "../Axios/Api"
import actionTypes from "./constants"

// Product 
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

export const postProduct = (data) => {
    return async (dispatch) => {
        const response = await Api.post(`/products`, data)
        console.log(response)
        dispatch({
            type: actionTypes.ADD_PRODUCT,
            payload: response.data?.data
        })
    }
}

export const updateProduct = (id, data) => {
    return async (dispatch) => {
        const response = await Api.patch(`/products/${id}`, data)
        console.log(response)
        dispatch({
            type: actionTypes.UPDATE_PRODUCT,
            payload: response.data?.data
        })
    }
}

export const deleteProduct = (id) => {
    return async (dispatch) => {
        const response = await Api.delete(`/products/${id}`)
        console.log(response)
        dispatch({
            type: actionTypes.DELETE_PRODUCT,
            payload: {
                res: response.data.data,
                id: id
            }
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


// Orders 

export const postOrders = (data) => {
    return async (dispatch) => {
        const response = await Api.post(`/orders`, data)
        dispatch({
            type: actionTypes.POST_ORDER,
            payload: response.data?.data
        })
    }
}

export const getAllOrders = () => {
    return async (dispatch) => {
        const response = await Api.get(`/orders`,)
        // console.log(response.data.data);
        dispatch({
            type: actionTypes.GET_ALL_ORDER,
            payload: response.data.data.result
        })
    }
}

export const orderByFilter = (url) => {
    return async (dispatch) => {
        console.log(url);
        const response = await Api.get(url)
        dispatch({
            type: actionTypes.ORDER_BY_FILTER,
            payload: response.data?.data?.result
        })
    }
}

export const getOrdersByEmail = (email) => {
    return async (dispatch) => {
        const response = await Api.get(`/orders/${email}`,)
        console.log(response.data.data);
        dispatch({
            type: actionTypes.GET_ORDER_BY_EMAIl,
            payload: response.data.data
        })
    }
}

export const updateorder = (id, data) => {
    return async (dispatch) => {
        const response = await Api.patch(`/orders/${id}`, data)
        console.log(response)
        dispatch({
            type: actionTypes.UPDATE_ORDER,
            payload: response.data?.data
        })
    }
}

export const removeUpdatedProduct = () => {
    return {
        type: actionTypes.REMOVE_UPDATED_PRODUCT,
    }
}

export const deleteOrder = (id) => {
    return async (dispatch) => {
        const response = await Api.delete(`/orders/${id}`)
        console.log(response)
        dispatch({
            type: actionTypes.DELETE_ORDER,
            payload: {
                res: response.data.data,
                id: id
            }
        })
    }
}

// Users 
export const getUsers = () => {
    return async (dispatch) => {
        const response = await Api.get(`/users`)
        dispatch({
            type: actionTypes.GET_USERS,
            payload: response.data.data.result
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
            if (response.data.status === 'success') {
                dispatch({
                    type: actionTypes.GET_ME,
                    payload: response.data.data
                })
            }
        } catch (error) {
            console.log(error.response.data.status)
            if (error.response.data.status === 'fail') {
                dispatch({
                    type: actionTypes.GET_ME,
                    payload: []
                })
            }
        }
    }
}

export const updateUserAction = (data) => {
    return async (dispatch) => {
        const response = await Api.patch(`/users/me`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        console.log(response)
        dispatch({
            type: actionTypes.UPDATE_USER,
            payload: response.data?.data
        })
    }
}

export const updateUserById = (id, data) => {
    return async (dispatch) => {
        const response = await Api.patch(`/users/update/${id}`, data)
        console.log(response)
        dispatch({
            type: actionTypes.UPDATE_USER,
            payload: response.data?.data
        })
    }
}

// Brand 

export const fetchBrands = () => {
    return async (dispatch) => {
        const response = await Api.get('/brands')
        // console.log(response);
        dispatch({
            type: actionTypes.FETCH_BRANDS,
            payload: response.data?.data?.result
        })
    }
}

export const fetchBrand = (id) => {
    return async (dispatch) => {
        const response = await Api.get(`/brands/${id}`)
        // console.log(response.data.data);
        dispatch({
            type: actionTypes.FETCH_BRAND,
            payload: response.data?.data
        })
    }
}

export const createBrand = (data) => {
    return async (dispatch) => {
        const response = await Api.post(`/brands`, data)
        console.log(response)
        dispatch({
            type: actionTypes.CREATE_BRAND,
            payload: response.data?.data
        })
    }
}

// Category 

export const fetchCategories = () => {
    return async (dispatch) => {
        const response = await Api.get('/categories')
        // console.log(response);
        dispatch({
            type: actionTypes.FETCH_CATEGORIES,
            payload: response.data?.data?.result
        })
    }
}

export const fetchCategory = (id) => {
    return async (dispatch) => {
        const response = await Api.get(`/categories/${id}`)
        // console.log(response);
        dispatch({
            type: actionTypes.FETCH_CATEGORY,
            payload: response.data?.data?.result
        })
    }
}

export const createCategory = (data) => {
    return async (dispatch) => {
        const response = await Api.post(`/categories`, data)
        console.log(response)
        dispatch({
            type: actionTypes.CREATE_CATEGORY,
            payload: response.data?.data
        })
    }
}






