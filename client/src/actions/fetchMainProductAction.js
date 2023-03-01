import {
  FETCH_MAIN_PRODUCT_START,
  FETCH_MAIN_PRODUCT_SUCCESS,
  FETCH_MAIN_PRODUCT_FAILURE,
} from "./actionTypes";

const key = process.env.REACT_APP_API_KEY;
const url = "https://api.rawg.io/api/games/";

export const fetchMainProductStart = () => {
  return {
    type: FETCH_MAIN_PRODUCT_START,
  };
};

export const fetchMainProductSuccess = (product) => {
  return {
    type: FETCH_MAIN_PRODUCT_SUCCESS,
    payload: product,
  };
};

export const fetchMainProductFailure = (error) => {
  return {
    type: FETCH_MAIN_PRODUCT_FAILURE,
    payload: error,
  };
};

export const fetchMainProduct = (id) => {
  return async (dispatch) => {
    dispatch(fetchMainProductStart());
    try {
      const response = await fetch(url + id + `?key=${key}`);
      const product = await response.json();
      console.log(product);
      dispatch(fetchMainProductSuccess(product));
    } catch (error) {
      dispatch(fetchMainProductFailure(error.message));
    }
  };
};
