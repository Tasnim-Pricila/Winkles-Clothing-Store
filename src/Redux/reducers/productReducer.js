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
  stock: "",
  brand: "",
  category: "",
  ltPrice: "",
  gtPrice: "",
  searchText: ""
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
    case actionTypes.SET_STOCK:
      return {
        ...state,
        stock: action.payload,
      };
    case actionTypes.SET_BRAND:
      return {
        ...state,
        brand: action.payload,
      };
    case actionTypes.SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case actionTypes.SET_LTPRICE:
      return {
        ...state,
        ltPrice: action.payload,
      };
    case actionTypes.SET_GTPRICE:
      return {
        ...state,
        gtPrice: action.payload,
      };
    case actionTypes.SET_SEARCHTEXT:
      return {
        ...state,
        searchText: action.payload,
      };
    default:
      return state;
  }
};

export { productReducer };
