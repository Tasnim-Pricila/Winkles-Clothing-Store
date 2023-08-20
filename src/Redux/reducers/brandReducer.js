import actionTypes from "../constants";

const initialState = {
  brands: [],
  brand: [],
  createBrand: [],
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BRANDS:
      return {
        ...state,
        brands: action.payload,
      };
    case actionTypes.FETCH_BRAND:
      return {
        ...state,
        brand: action.payload,
      };
    case actionTypes.CREATE_BRAND:
      return {
        ...state,
        createBrand: action.payload,
      };

    default:
      return state;
  }
};

export { brandReducer };
