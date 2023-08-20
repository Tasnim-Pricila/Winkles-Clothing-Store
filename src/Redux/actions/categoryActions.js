import Api from "../../Axios/Api";
import actionTypes from "../constants";

export const fetchCategories = () => {
    return async (dispatch) => {
      const response = await Api.get("/categories");
      // console.log(response);
      dispatch({
        type: actionTypes.FETCH_CATEGORIES,
        payload: response.data?.data?.result,
      });
    };
  };
  
  export const fetchCategory = (id) => {
    return async (dispatch) => {
      const response = await Api.get(`/categories/${id}`);
      // console.log(response);
      dispatch({
        type: actionTypes.FETCH_CATEGORY,
        payload: response.data?.data?.result,
      });
    };
  };
  
  export const createCategory = (data) => {
    return async (dispatch) => {
      const response = await Api.post(`/categories`, data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      // console.log(response)
      dispatch({
        type: actionTypes.CREATE_CATEGORY,
        payload: response.data?.data,
      });
    };
  };
  