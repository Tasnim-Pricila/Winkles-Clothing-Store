import actionTypes from "../constants";

const initialState = {
  postOrder: [],
  orders: [],
  allOrder: [],
  updateOrder: [],
  searchOrders: [],
  loading: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_ORDER:
      return {
        ...state,
        postOrder: action.payload,
      };
    case actionTypes.GET_ORDER_BY_EMAIl:
      return {
        ...state,
        orders: action.payload,
      };
    case actionTypes.GET_ALL_ORDER:
      return {
        ...state,
        allOrder: action.payload,
      };
    case actionTypes.SEARCH_ORDER:
      return {
        ...state,
        searchOrders: state.allOrder.filter(
          (order) =>
            order._id === action.payload.searchText ||
            order.name
              .toLowerCase()
              .includes(action.payload.searchText.toLowerCase())
        ),
      };
    case actionTypes.ORDER_BY_FILTER:
      return {
        ...state,
        allOrder: action.payload,
      };
    case actionTypes.DELETE_ORDER:
      return {
        ...state,
        allOrder: state.allOrder.filter(
          (order) => order._id !== action.payload.id
        ),
      };
    case actionTypes.UPDATE_ORDER:
      return {
        ...state,
        updateOrder: action.payload,
      };
    case actionTypes.REMOVE_UPDATED_PRODUCT:
      return {
        ...state,
        updateOrder: [],
      };
    default:
      return state;
  }
};
