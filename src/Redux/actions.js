import { toast } from "react-toastify"
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

export const fetchProductsByPagination = (page) => {
    return async (dispatch) => {
        const response = await Api.get(`/products?page=${page}&limit=12`)
        // console.log(response);
        dispatch({
            type: actionTypes.FETCH_PRODUCTS_ByPAGINATION,
            payload: response.data?.data
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
        await Api.post(`/products`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(data => {
                // console.log(data);
                if (data?.data?.status === 'success') {
                    dispatch({
                        type: actionTypes.ADD_PRODUCT,
                        payload: data?.data
                    })
                    toast.success('Product Added Successfully ', {
                        theme: 'colored',
                    });
                }
            })
            .catch(err => {
                // console.log(err.response.data)
                if (err.response.data.status === 'fail') {
                    toast.error(err.response.data.error, {
                        theme: 'colored',
                    });
                    toast.error(err.response.data.message, {
                        theme: 'colored',
                    });
                }
            })
    }
}

export const updateProduct = (id, data) => {
    return async (dispatch) => {
        await Api.patch(`/products/${id}`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(data => {
            // console.log(data);
            if (data?.data?.status === 'success') {
                dispatch({
                    type: actionTypes.UPDATE_PRODUCT,
                    payload: data?.data
                })
                toast.success( data.data.message , {
                    theme: 'colored',
                });
            }
        })
        .catch(err => {
            // console.log(err.response.data)
            if (err.response.data.status === 'fail') {
                toast.error(err.response.data.error, {
                    theme: 'colored',
                });
                toast.error(err.response.data.message, {
                    theme: 'colored',
                });
            }
        })
       
    }
}

export const deleteProduct = (id) => {
    return async (dispatch) => {
        await Api.delete(`/products/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(data => {
            // console.log(data);
            if (data?.data?.status === 'success') {
                dispatch({
                    type: actionTypes.DELETE_PRODUCT,
                    payload: {
                        res: data.data,
                        id: id
                    }
                })
                toast.success(data.data.message, {
                    theme: 'colored',
                });
            }
        })
        .catch(err => {
            // console.log(err.response.data)
            if (err.response.data.status === 'fail') {
                toast.error(err.response.data.error, {
                    theme: 'colored',
                });
                toast.error(err.response.data.message, {
                    theme: 'colored',
                });
            }
        })
    }
}

export const removeSelectedProduct = () => {
    return {
        type: actionTypes.REMOVE_SELECTED_PRODUCT,
    }
}

export const addToCart = (userId, data, itemID) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.LOADING })
        await Api.patch(`/users/update/${userId}`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(data => {
            // console.log(data);
            if (data?.data?.status === 'success') {
                dispatch({
                    type: actionTypes.ADD_TO_CART,
                    payload: {
                        postCart: data?.data,
                        id: itemID
                    }
                })
            }
        })
        .catch(err => {
            // console.log(err.response.data)
            if (err.response.data.status === 'fail') {
                toast.error(err.response.data.error, {
                    theme: 'colored',
                });
            }
        })        
    }
}



export const addToWishlist = (userId, data) => {
    return async (dispatch) => {
        await Api.patch(`/users/update/${userId}`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(data => {
            // console.log(data);
            if (data?.data?.status === 'success') {
                dispatch({
                    type: actionTypes.ADD_TO_WISHLIST,
                    payload: {
                        wishlist: data?.data,
                    }
                })
            }
        })
        .catch(err => {
            // console.log(err.response.data)
            if (err.response.data.status === 'fail') {
                toast.error(err.response.data.error, {
                    theme: 'colored',
                });
            }
        })   

            
        
    }
}

export const resetSavecart = () => {
    return {
        type: actionTypes.RESET_SAVECART,
    }
}

export const getCart = () => {
    return async (dispatch) => {
        // console.log(data);
        const response = await Api.get(`/users/me`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        dispatch({
            type: actionTypes.GET_CART,
            payload: response.data.data.cart.product
        })
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

export const clearCart = () => {
    return {
        type: actionTypes.CLEAR_CART,
    }
}

export const adjustQty = (productId, itemID, qty, data) => {
    return async (dispatch) => {
        // console.log(data);
        const response = await Api.patch(`/users/me/${productId}`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        // console.log(response);
        dispatch({
            type: actionTypes.ADJUST_QTY,
            payload: {
                id: itemID,
                qty: qty
            }
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
export const searchProductsbyPagination = (text) => {
    return {
        type: actionTypes.SEARCH_PRODUCT_BY_PAGINATION,
        payload: {
            searchText: text
        }
    }
}

export const searchByFilter = (url) => {
    return async (dispatch) => {
        // console.log(url);
        const response = await Api.get(url)
        // console.log(response);
        dispatch({
            type: actionTypes.SEARCH_BY_FILTER,
            payload: response.data?.data
        })
    }
}

export const searchByCatAndBrand = (url) => {
    return async (dispatch) => {
        // console.log(url);
        const response = await Api.get(url)
        dispatch({
            type: actionTypes.SEARCH_BY_CAT_BRAND,
            payload: response.data?.data?.result
        })
    }
}

// Orders 

export const postOrders = (data) => {
    return async (dispatch) => {
        await Api.post(`/orders`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(data => {
            // console.log(data);
            if (data?.data?.status === 'success') {
                dispatch({
                    type: actionTypes.POST_ORDER,
                    payload: data.data
                })
                toast.success(data.data.message, {
                    theme: 'colored',
                });
            }
        })
        .catch(err => {
            // console.log(err.response.data)
            if (err.response.data.status === 'fail') {
                toast.error(err.response.data.error, {
                    theme: 'colored',
                });
                toast.error(err.response.data.message, {
                    theme: 'colored',
                });
            }
        })
    }
}

export const getAllOrders = () => {
    return async (dispatch) => {
        const response = await Api.get(`/orders`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        // console.log(response.data.data);
        dispatch({
            type: actionTypes.GET_ALL_ORDER,
            payload: response.data.data.result
        })
    }
}

export const searchOrders = (text) => {
    return {
        type: actionTypes.SEARCH_ORDER,
        payload: {
            searchText: text
        }
    }
}

export const orderByFilter = (url) => {
    return async (dispatch) => {
        // console.log(url);
        const response = await Api.get(url, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        dispatch({
            type: actionTypes.ORDER_BY_FILTER,
            payload: response.data?.data?.result
        })
    }
}

export const getOrdersByEmail = (email) => {
    return async (dispatch) => {
        const response = await Api.get(`/orders/${email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        console.log(response.data.data);
        dispatch({
            type: actionTypes.GET_ORDER_BY_EMAIl,
            payload: response.data.data
        })
    }
}

export const updateorder = (id, data) => {
    return async (dispatch) => {
        await Api.patch(`/orders/${id}`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(data => {
            // console.log(data);
            if (data?.data?.status === 'success') {
                dispatch({
                    type: actionTypes.UPDATE_ORDER,
                    payload: data?.data
                })
                toast.success(data.data.message, {
                    theme: 'colored',
                });
            }
        })
        .catch(err => {
            // console.log(err.response.data)
            if (err.response.data.status === 'fail') {
                toast.error(err.response.data.error, {
                    theme: 'colored',
                });
                toast.error(err.response.data.message, {
                    theme: 'colored',
                });
            }
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
        await Api.delete(`/orders/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(data => {
            // console.log(data);
            if (data?.data?.status === 'success') {
                dispatch({
                    type: actionTypes.DELETE_ORDER,
                    payload: {
                        res: data.data,
                        id: id
                    }
                })
                toast.success(data.data.message, {
                    theme: 'colored',
                });
            }
        })
        .catch(err => {
            // console.log(err.response.data)
            if (err.response.data.status === 'fail') {
                toast.error(err.response.data.error, {
                    theme: 'colored',
                });
                toast.error(err.response.data.message, {
                    theme: 'colored',
                });
            }
        })
    }
}

// Users 

export const getUsers = () => {
    return async (dispatch) => {
        const response = await Api.get(`/users`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        dispatch({
            type: actionTypes.GET_USERS,
            payload: response.data.data.result
        })

    }
}

export const searchUsers = (text) => {
    return {
        type: actionTypes.SEARCH_USER,
        payload: {
            searchText: text
        }
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
            // console.log(error.response.data.status)
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
        const response = await Api.patch(`/users/update/${id}`, data, {
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
        const response = await Api.post(`/brands`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        // console.log(response)
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
        const response = await Api.post(`/categories`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        console.log(response)
        dispatch({
            type: actionTypes.CREATE_CATEGORY,
            payload: response.data?.data
        })
    }
}

// / Blog 

export const fetchBlogs = () => {
    return async (dispatch) => {
        const response = await Api.get('/blogs')
        // console.log(response);
        dispatch({
            type: actionTypes.FETCH_BLOGS,
            payload: response.data?.data?.result
        })
    }
}

export const fetchBlog = (id) => {
    return async (dispatch) => {
        const response = await Api.get(`/blogs/${id}`)
        // console.log(response.data.data);
        dispatch({
            type: actionTypes.FETCH_BLOG_BY_ID,
            payload: response.data?.data
        })
    }
}

export const createBlog = (data) => {
    return async (dispatch) => {
        const response = await Api.post(`/blogs`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        console.log(response)
        dispatch({
            type: actionTypes.CREATE_BLOG,
            payload: response.data?.data
        })
    }
}

export const updateBlog = (id, data) => {
    return async (dispatch) => {
        const response = await Api.patch(`/blogs/${id}`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        console.log(response)
        dispatch({
            type: actionTypes.UPDATE_BLOG,
            payload: response.data?.data
        })
    }
}

export const deleteBlog = (id) => {
    return async (dispatch) => {
        const response = await Api.delete(`/blogs/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        console.log(response)
        dispatch({
            type: actionTypes.DELETE_BLOG,
            payload: {
                res: response.data.data,
                id: id
            }
        })
    }
}

// Review 

export const fetchReview = () => {
    return async (dispatch) => {
        const response = await Api.get('/reviews')
        console.log(response);
        dispatch({
            type: actionTypes.FETCH_REVIEW,
            payload: response.data?.data?.result
        })
    }
}

export const fetchReviewbyProductId = (id) => {
    return async (dispatch) => {
        const response = await Api.get(`/reviews/product/${id}`)
        // console.log(response);
        dispatch({
            type: actionTypes.FETCH_REVIEW_BY_PRODUCT_ID,
            payload: response.data?.data
        })
    }
}

export const createReview = (data) => {
    return async (dispatch) => {
        const response = await Api.post(`/reviews`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        // console.log(response)
        dispatch({
            type: actionTypes.CREATE_REVIEW,
            payload: response.data?.data
        })
    }
}