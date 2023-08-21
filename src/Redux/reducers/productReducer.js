import actionTypes from "../constants";

const initialState = {
  products: [],
  cart: [],
  filter: [],
  searchProducts: [],
  searchAllProducts: [],
  addProduct: [],
  product: [],
  allProducts: [],
  saveCart: [],
  wishlist: [],
  loading: false,
  trending: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
      };

    case actionTypes.TRENDING_PRODUCTS:
      return {
        ...state,
        trending: action.payload,
      };

    case actionTypes.FETCH_PRODUCTS_ByPAGINATION:
      return {
        ...state,
        products: action.payload,
      };

    case actionTypes.FETCH_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };

    case actionTypes.REMOVE_SELECTED_PRODUCT:
      return {
        ...state,
        product: [],
      };

    case actionTypes.ADD_PRODUCT:
      return {
        ...state,
        addProduct: action.payload,
      };

    case actionTypes.UPDATE_PRODUCT:
      return {
        ...state,
        addProduct: action.payload,
      };

    case actionTypes.DELETE_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.filter(
          (product) => product._id !== action.payload.id
        ),
      };

    case actionTypes.ADD_TO_CART:
      // get the items data from the products array
      const item = state.allProducts.find(
        (product) => product._id === action.payload.id
      );
      // // check if the item is in cart or not
      const inCart = state.cart.find((item) =>
        item._id === action.payload.id ? true : false
      );

      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item._id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
        saveCart: action.payload.postCart,
        loading: false,
      };

    case actionTypes.ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: action.payload.wishlist,
      };

    case actionTypes.GET_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((prod) => prod._id !== action.payload.id),
      };

    case actionTypes.CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    case actionTypes.ADJUST_QTY:
      return {
        ...state,
        // cart: state.cart.map((item) =>
        //   item._id === action.payload.id
        //     ? { ...item, qty: action.payload.qty }
        //     : item
        // ),
      };

    case actionTypes.SEARCH_BY_FILTER:
      return {
        ...state,
        products: action.payload,
      };

    case actionTypes.SEARCH_BY_CAT_BRAND:
      return {
        ...state,
        allProducts: action.payload,
      };

    case actionTypes.SEARCH_PRODUCT_BY_PAGINATION:
      return {
        ...state,
        searchProducts: state.products.result.filter((product) =>
          product.title.includes(action.payload.searchText.toLowerCase())
        ),
      };

    case actionTypes.SEARCH_PRODUCT:
      return {
        ...state,
        searchAllProducts: state.allProducts.filter((product) =>
          product.title.includes(action.payload.searchText.toLowerCase())
        ),
      };

    case actionTypes.LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.LOADING_STOP:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export { productReducer };
