import { combineReducers } from 'redux';
import fetchProductsReducer from './fetchProductsReducer';
import fetchSingleProductReducer from './fetchSingleProductReducer';

const allReducers = combineReducers({
    fetchProducts: fetchProductsReducer,
    fetchSingleProduct: fetchSingleProductReducer
});

export default allReducers;