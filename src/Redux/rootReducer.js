import { combineReducers } from 'redux';
import { orderReducer } from './orderReducer';
import { productReducer, singleProductReducer } from './productReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
    allProducts: productReducer,
    singleProduct: singleProductReducer,
    allUsers: userReducer,
    orders: orderReducer
})

export default rootReducer;