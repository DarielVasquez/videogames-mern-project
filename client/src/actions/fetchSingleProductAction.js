import {
    FETCH_SINGLE_PRODUCT_START,
    FETCH_SINGLE_PRODUCT_SUCCESS,
    FETCH_SINGLE_PRODUCT_FAILURE
  } from './actionTypes';

const url = 'https://api.rawg.io/api/games/';

export const fetchSingleProductStart = () => {
    return {
        type: FETCH_SINGLE_PRODUCT_START,
    };
  }

export const fetchSingleProductSuccess = (product) => {
    return {
        type: FETCH_SINGLE_PRODUCT_SUCCESS, payload: product
    };
};

export const fetchSingleProductFailure = (error) => {
    return {
        type: FETCH_SINGLE_PRODUCT_FAILURE, payload: error
    };
};

export const fetchSingleProduct = (id) => {
    return async (dispatch) => {
      dispatch(fetchSingleProductStart());
      try {
        const response = await fetch(url+id+`?key=ca9dd90e0e4848d4bf202e5bde6fdc3c`);
        const product = await response.json();
        dispatch(fetchSingleProductSuccess(product));
      } catch (error) {
        dispatch(fetchSingleProductFailure(error.message));
      }
    };
  };