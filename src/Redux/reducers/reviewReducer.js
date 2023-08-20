import actionTypes from "../constants";

const initialState = {
  reviews: [],
  review: [],
  createReview: [],
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_REVIEW:
      return {
        ...state,
        reviews: action.payload,
      };
    case actionTypes.FETCH_REVIEW_BY_PRODUCT_ID:
      return {
        ...state,
        review: action.payload,
      };
    case actionTypes.CREATE_REVIEW:
      return {
        ...state,
        createReview: action.payload,
      };

    default:
      return state;
  }
};

export { reviewReducer };
