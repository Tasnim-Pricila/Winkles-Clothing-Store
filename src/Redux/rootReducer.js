import { combineReducers } from 'redux';
import { productReducer, singleProductReducer } from './productReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
    allProducts: productReducer,
    singleProduct: singleProductReducer,
    allUsers: userReducer
})

export default rootReducer;