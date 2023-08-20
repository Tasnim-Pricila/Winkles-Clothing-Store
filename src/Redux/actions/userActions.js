import Api from "../../Axios/Api";
import actionTypes from "../constants";

export const getUsers = () => {
    return async (dispatch) => {
      const response = await Api.get(`/users`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      dispatch({
        type: actionTypes.GET_USERS,
        payload: response.data.data.result,
      });
    };
  };
  
  export const searchUsers = (text) => {
    return {
      type: actionTypes.SEARCH_USER,
      payload: {
        searchText: text,
      },
    };
  };
  
  export const getMe = () => {
    return async (dispatch) => {
      try {
        const response = await Api.get(`/users/me`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (response.data.status === "success") {
          dispatch({
            type: actionTypes.GET_ME,
            payload: response.data.data,
          });
        }
      } catch (error) {
        // console.log(error.response.data.status)
        if (error.response.data.status === "fail") {
          dispatch({
            type: actionTypes.GET_ME,
            payload: [],
          });
        }
      }
    };
  };
  
  export const updateUserAction = (data) => {
    return async (dispatch) => {
      const response = await Api.patch(`/users/me`, data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      // console.log(response)
      dispatch({
        type: actionTypes.UPDATE_USER,
        payload: response.data?.data,
      });
    };
  };
  
  export const updateUserById = (id, data) => {
    return async (dispatch) => {
      const response = await Api.patch(`/users/update/${id}`, data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      // console.log(response)
      dispatch({
        type: actionTypes.UPDATE_USER,
        payload: response.data?.data,
      });
    };
  };