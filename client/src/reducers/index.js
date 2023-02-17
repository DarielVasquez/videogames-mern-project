import { combineReducers } from 'redux';
import initialState from '../store/initialState';
// import fetchReducer from './fetch';

const allReducers = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PRODUCTS_START':
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case 'FETCH_PRODUCTS_SUCCESS':
        return {
          ...state,
          isLoading: false,
          products: action.payload,
        };
      case 'FETCH_PRODUCTS_FAILURE':
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };


// const allReducers = combineReducers({
//     fetch: fetchReducer,
// });

export default allReducers;