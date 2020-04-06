import { combineReducers } from 'redux';
import products from './products'
import category from './category'
import cart from './cart'
import order from './checkout'
export default combineReducers({
    products,
    category,
    cart,
    order
});