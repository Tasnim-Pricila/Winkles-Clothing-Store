import { combineReducers } from 'redux';
import { brandReducer } from './brandReducer';
import { categoryReducer } from './categoryReducer';
import { orderReducer } from './orderReducer';
import { productReducer } from './productReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
    allProducts: productReducer,
    allUsers: userReducer,
    orders: orderReducer,
    brands: brandReducer,
    category: categoryReducer
})

export default rootReducer;