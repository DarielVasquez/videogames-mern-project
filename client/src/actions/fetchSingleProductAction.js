import {
  FETCH_SINGLE_PRODUCT_START,
  FETCH_SINGLE_PRODUCT_SUCCESS,
  FETCH_SINGLE_PRODUCT_FAILURE,
} from "./actionTypes";

const key = process.env.REACT_APP_API_KEY;
const url = "https://api.rawg.io/api/games/";

export const fetchSingleProductStart = () => {
  return {
    type: FETCH_SINGLE_PRODUCT_START,
  };
};

export const fetchSingleProductSuccess = (product) => {
  return {
    type: FETCH_SINGLE_PRODUCT_SUCCESS,
    payload: product,
  };
};

export const fetchSingleProductFailure = (error) => {
  return {
    type: FETCH_SINGLE_PRODUCT_FAILURE,
    payload: error,
  };
};

export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    dispatch(fetchSingleProductStart());
    try {
      const response = await fetch(url + id + `?key=${key}`);
      const product = await response.json();
      dispatch(fetchSingleProductSuccess(product));
    } catch (error) {
      dispatch(fetchSingleProductFailure(error.message));
    }
  };
};
