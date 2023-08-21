import Api from "../../Axios/Api";
import actionTypes from "../constants";

export const fetchReview = () => {
  return async (dispatch) => {
    const response = await Api.get("/reviews");
    // console.log(response);
    dispatch({
      type: actionTypes.FETCH_REVIEW,
      payload: response.data?.data?.result,
    });
  };
};

export const fetchReviewbyProductId = (id) => {
  return async (dispatch) => {
    const response = await Api.get(`/reviews/product/${id}`);
    // console.log(response);
    dispatch({
      type: actionTypes.FETCH_REVIEW_BY_PRODUCT_ID,
      payload: response.data?.data,
    });
  };
};

export const createReview = (data) => {
  return async (dispatch) => {
    const response = await Api.post(`/reviews`, data, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    // console.log(response)
    dispatch({
      type: actionTypes.CREATE_REVIEW,
      payload: response.data?.data,
    });
  };
};
