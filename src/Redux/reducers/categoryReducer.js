import actionTypes from "../constants";

const initialState = {
  categories: [],
  category: [],
  createCategory: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case actionTypes.FETCH_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case actionTypes.CREATE_CATEGORY:
      return {
        ...state,
        createCategory: action.payload,
      };

    default:
      return state;
  }
};

export { categoryReducer };
