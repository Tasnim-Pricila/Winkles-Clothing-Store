import actionTypes from "../constants";

const initialState = {
  blogs: [],
  blog: [],
  createBlog: [],
  updateBlog: [],
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      };
    case actionTypes.FETCH_BLOG_BY_ID:
      return {
        ...state,
        blog: action.payload,
      };
    case actionTypes.CREATE_BLOG:
      return {
        ...state,
        createBlog: action.payload,
      };
    case actionTypes.UPDATE_BLOG:
      return {
        ...state,
        updateBlog: action.payload,
      };
    case actionTypes.DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog._id !== action.payload.id),
      };
    default:
      return state;
  }
};

export { blogReducer };
