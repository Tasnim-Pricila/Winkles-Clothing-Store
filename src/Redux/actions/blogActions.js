import Api from "../../Axios/Api";
import actionTypes from "../constants";

export const fetchBlogs = () => {
    return async (dispatch) => {
      const response = await Api.get("/blogs");
      // console.log(response);
      dispatch({
        type: actionTypes.FETCH_BLOGS,
        payload: response.data?.data?.result,
      });
    };
  };
  
  export const fetchBlog = (id) => {
    return async (dispatch) => {
      const response = await Api.get(`/blogs/${id}`);
      // console.log(response.data.data);
      dispatch({
        type: actionTypes.FETCH_BLOG_BY_ID,
        payload: response.data?.data,
      });
    };
  };
  
  export const createBlog = (data) => {
    return async (dispatch) => {
      const response = await Api.post(`/blogs`, data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      // console.log(response)
      dispatch({
        type: actionTypes.CREATE_BLOG,
        payload: response.data?.data,
      });
    };
  };
  
  export const updateBlog = (id, data) => {
    return async (dispatch) => {
      const response = await Api.patch(`/blogs/${id}`, data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      // console.log(response)
      dispatch({
        type: actionTypes.UPDATE_BLOG,
        payload: response.data?.data,
      });
    };
  };
  
  export const deleteBlog = (id) => {
    return async (dispatch) => {
      const response = await Api.delete(`/blogs/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      // console.log(response)
      dispatch({
        type: actionTypes.DELETE_BLOG,
        payload: {
          res: response.data.data,
          id: id,
        },
      });
    };
  };