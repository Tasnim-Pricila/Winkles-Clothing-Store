import { toast } from "react-toastify";
import Api from "../../Axios/Api";
import actionTypes from "../constants";

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    await Api.get("/products")
      .then((data) => {
        if (data?.data?.status === "success") {
          dispatch({
            type: actionTypes.FETCH_PRODUCTS,
            payload: data?.data?.data?.result,
          });
          dispatch({ type: actionTypes.LOADING_STOP });
        }
      })
      .catch((err) => {
        if (err.response.data.status === "fail") {
          dispatch({ type: actionTypes.LOADING_STOP });
          toast.error(err.response.data.error, {
            theme: "colored",
          });
          toast.error(err.response.data.message, {
            theme: "colored",
          });
        }
      });
  };
};

export const trendingProducts = () => {
  return async (dispatch) => {
    const response = await Api.get("/products/trending");
    dispatch({
      type: actionTypes.TRENDING_PRODUCTS,
      payload: response.data?.data,
    });
  };
};

export const fetchProductsByPagination = (page) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    await Api.get(`/products?page=${page}&limit=12`)
      .then((data) => {
        if (data?.data?.status === "success") {
          dispatch({
            type: actionTypes.FETCH_PRODUCTS_ByPAGINATION,
            payload: data?.data?.data,
          });
          dispatch({ type: actionTypes.LOADING_STOP });
        }
      })
      .catch((err) => {
        if (err.response.data.status === "fail") {
          dispatch({ type: actionTypes.LOADING_STOP });
          toast.error(err.response.data.error, {
            theme: "colored",
          });
          toast.error(err.response.data.message, {
            theme: "colored",
          });
        }
      });
  };
};

export const fetchProduct = (id) => {
  return async (dispatch) => {
    const response = await Api.get(`/products/${id}`);
    dispatch({
      type: actionTypes.FETCH_PRODUCT,
      payload: response.data?.data,
    });
  };
};

export const postProduct = (data) => {
  return async (dispatch) => {
    await Api.post(`/products`, data, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((data) => {
        // console.log(data);
        if (data?.data?.status === "success") {
          dispatch({
            type: actionTypes.ADD_PRODUCT,
            payload: data?.data,
          });
          toast.success("Product Added Successfully ", {
            theme: "colored",
          });
        }
      })
      .catch((err) => {
        // console.log(err.response.data)
        if (err.response.data.status === "fail") {
          toast.error(err.response.data.error, {
            theme: "colored",
          });
          toast.error(err.response.data.message, {
            theme: "colored",
          });
        }
      });
  };
};

export const updateProduct = (id, data) => {
  return async (dispatch) => {
    await Api.patch(`/products/${id}`, data, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((data) => {
        // console.log(data);
        if (data?.data?.status === "success") {
          dispatch({
            type: actionTypes.UPDATE_PRODUCT,
            payload: data?.data,
          });
          toast.success(data.data.message, {
            theme: "colored",
          });
        }
      })
      .catch((err) => {
        // console.log(err.response.data)
        if (err.response.data.status === "fail") {
          toast.error(err.response.data.error, {
            theme: "colored",
          });
          toast.error(err.response.data.message, {
            theme: "colored",
          });
        }
      });
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    await Api.delete(`/products/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((data) => {
        // console.log(data);
        if (data?.data?.status === "success") {
          dispatch({
            type: actionTypes.DELETE_PRODUCT,
            payload: {
              res: data.data,
              id: id,
            },
          });
          toast.success(data.data.message, {
            theme: "colored",
          });
        }
      })
      .catch((err) => {
        // console.log(err.response.data)
        if (err.response.data.status === "fail") {
          toast.error(err.response.data.error, {
            theme: "colored",
          });
          toast.error(err.response.data.message, {
            theme: "colored",
          });
        }
      });
  };
};

export const removeSelectedProduct = () => {
  return {
    type: actionTypes.REMOVE_SELECTED_PRODUCT,
  };
};

export const addToCart = (userId, data) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    await Api.patch(`/users/update/${userId}`, data, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((data) => {
        if (data?.data?.status === "success") {
          dispatch({ type: actionTypes.LOADING_STOP });
        }
      })
      .catch((err) => {
        if (err.response.data.status === "fail") {
          dispatch({ type: actionTypes.LOADING_STOP });
          toast.error(err.response.data.error, {
            theme: "colored",
          });
        }
      });
  };
};

export const addToWishlist = (userId, data) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    await Api.patch(`/users/update/${userId}`, data, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((data) => {
        if (data?.data?.status === "success") {
          dispatch({ type: actionTypes.LOADING_STOP });
        }
      })
      .catch((err) => {
        if (err.response.data.status === "fail") {
          dispatch({ type: actionTypes.LOADING_STOP });
          toast.error(err.response.data.error, {
            theme: "colored",
          });
        }
      });
  };
};

export const adjustQty = (productId, data) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    await Api.patch(`/users/me/${productId}`, data, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((data) => {
        if (data?.data?.status === "success") {
          dispatch({ type: actionTypes.LOADING_STOP });
        }
      })
      .catch((err) => {
        if (err.response.data.status === "fail") {
          dispatch({ type: actionTypes.LOADING_STOP });
          toast.error(err.response.data.error, {
            theme: "colored",
          });
        }
      });
  };
};

export const searchProducts = (text) => {
  return {
    type: actionTypes.SEARCH_PRODUCT,
    payload: {
      searchText: text,
    },
  };
};

export const searchByFilter = (url) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    await Api.get(url)
      .then((data) => {
        if (data?.data?.status === "success") {
          dispatch({ type: actionTypes.LOADING_STOP });
          dispatch({
            type: actionTypes.SEARCH_BY_FILTER,
            payload: data?.data?.data,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: actionTypes.LOADING_STOP });
        if (err.response.data.status === "fail") {
          toast.error(err.response.data.error, {
            theme: "colored",
          });
          toast.error(err.response.data.message, {
            theme: "colored",
          });
        }
      });
  };
};

export const searchByCatAndBrand = (url) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    await Api.get(url)
      .then((data) => {
        if (data?.data?.status === "success") {
          dispatch({
            type: actionTypes.SEARCH_BY_CAT_BRAND,
            payload: data?.data?.data?.result,
          });
          dispatch({ type: actionTypes.LOADING_STOP });
        }
      })
      .catch((err) => {
        if (err.response.data.status === "fail") {
          dispatch({ type: actionTypes.LOADING_STOP });
          toast.error(err.response.data.error, {
            theme: "colored",
          });
          toast.error(err.response.data.message, {
            theme: "colored",
          });
        }
      });
  };
};

export const setStock = (data) => {
  return {
    type: actionTypes.SET_STOCK,
    payload: data,
  };
};
export const setSearchText = (data) => {
  return {
    type: actionTypes.SET_SEARCHTEXT,
    payload: data,
  };
};
export const setBrand = (data) => {
  return {
    type: actionTypes.SET_BRAND,
    payload: data,
  };
};
export const setCategory = (data) => {
  return {
    type: actionTypes.SET_CATEGORY,
    payload: data,
  };
};
export const setLtPrice = (data) => {
  return {
    type: actionTypes.SET_LTPRICE,
    payload: data,
  };
};
export const setGtPrice = (data) => {
  return {
    type: actionTypes.SET_GTPRICE,
    payload: data,
  };
};
