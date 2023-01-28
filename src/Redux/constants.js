const actionTypes = {
    LOADING: "LOADING",
    FETCH_PRODUCTS : "FETCH_PRODUCTS",
    FETCH_PRODUCTS_ByPAGINATION: "FETCH_PRODUCTS_ByPAGINATION",
    FETCH_PRODUCT : "FETCH_PRODUCT",
    REMOVE_SELECTED_PRODUCT : "REMOVE_SELECTED_PRODUCT",
    ADD_TO_CART: "ADD_TO_CART",
    ADD_TO_WISHLIST: "ADD_TO_WISHLIST",
    GET_CART: "GET_CART",
    REMOVE_FROM_CART: "REMOVE_FROM_CART",
    RESET_SAVECART: "RESET_SAVECART",
    ADJUST_QTY: "ADJUST_QTY",
    GET_USERS: "GET_USERS",
    REMOVE_SELECTED_USER: "REMOVE_SELECTED_USER",
    CLEAR_CART: "CLEAR_CART",
    GET_ME: "GET_ME",
    SEARCH_BY_FILTER : "SEARCH_BY_FILTER",
    SEARCH_BY_CAT_BRAND : "SEARCH_BY_CAT_BRAND",
    SEARCH_PRODUCT: "SEARCH_PRODUCT",
    ADD_PRODUCT: "ADD_PRODUCT",
    UPDATE_PRODUCT: "UPDATE_PRODUCT",
    DELETE_PRODUCT: "DELETE_PRODUCT",
    ALL_USERS: "ALL_USERS",
    SEARCH_USER: "SEARCH_USER",
    UPDATE_USER: "UPDATE_USER",
    FETCH_BRANDS: "FETCH_BRANDS",
    FETCH_BRAND: "FETCH_BRAND",
    CREATE_BRAND: "CREATE_BRAND",
    FETCH_CATEGORIES: "FETCH_CATEGORIES",
    FETCH_CATEGORY: "FETCH_CATEGORY",
    CREATE_CATEGORY: "CREATE_CATEGORY",
    POST_ORDER: "POST_ORDER",
    GET_ORDER_BY_EMAIl: "GET_ORDER_BY_EMAIl",
    GET_ALL_ORDER: "GET_ALL_ORDER",
    SEARCH_ORDER: "SEARCH_ORDER",
    DELETE_ORDER: "DELETE_ORDER",
    UPDATE_ORDER: "UPDATE_ORDER",
    REMOVE_UPDATED_PRODUCT: 'REMOVE_UPDATED_PRODUCT',
    ORDER_BY_FILTER: 'ORDER_BY_FILTER',
    CREATE_BLOG: "CREATE_BLOG",
    FETCH_BLOGS: "FETCH_BLOGS",
    FETCH_BLOG_BY_ID: "FETCH_BLOG_BY_ID",
    UPDATE_BLOG: "UPDATE_BLOG",
    DELETE_BLOG: "DELETE_BLOG",
    FETCH_REVIEW: "FETCH_REVIEW",
    FETCH_REVIEW_BY_PRODUCT_ID: "FETCH_REVIEW_BY_PRODUCT_ID",
    CREATE_REVIEW: "CREATE_REVIEW",
};

export default actionTypes;