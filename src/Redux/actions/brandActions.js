import Api from "../../Axios/Api";
import actionTypes from "../constants";

export const fetchBrands = () => {
    return async (dispatch) => {
      const response = await Api.get("/brands");
      // console.log(response);
      dispatch({
        type: actionTypes.FETCH_BRANDS,
        payload: response.data?.data?.result,
      });
    };
  };
  
  export const fetchBrand = (id) => {
    return async (dispatch) => {
      const response = await Api.get(`/brands/${id}`);
      // console.log(response.data.data);
      dispatch({
        type: actionTypes.FETCH_BRAND,
        payload: response.data?.data,
      });
    };
  };
  
  export const createBrand = (data) => {
    return async (dispatch) => {
      const response = await Api.post(`/brands`, data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      // console.log(response)
      dispatch({
        type: actionTypes.CREATE_BRAND,
        payload: response.data?.data,
      });
    };
  };