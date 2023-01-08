import { combineReducers } from 'redux';
import { blogReducer } from './blogReducer';
import { brandReducer } from './brandReducer';
import { categoryReducer } from './categoryReducer';
import { orderReducer } from './orderReducer';
import { productReducer } from './productReducer';
import { reviewReducer } from './reviewReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
    allProducts: productReducer,
    allUsers: userReducer,
    orders: orderReducer,
    brands: brandReducer,
    category: categoryReducer,
    blogs: blogReducer,
    reviews: reviewReducer
})

export default rootReducer;