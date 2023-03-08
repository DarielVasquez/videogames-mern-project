import {
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "./actionTypes";

const key = process.env.REACT_APP_API_KEY;
const dateToday = new Date().toISOString().slice(0, 10);
const dateOneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1))
  .toISOString()
  .slice(0, 10);
const latestProductsUrl = `https://api.rawg.io/api/games?key=${key}&dates=${dateOneMonthAgo},${dateToday}`;
const featuredProductsUrl = `https://api.rawg.io/api/games?key=${key}&ordering=-rating&dates=${dateOneMonthAgo},${dateToday}`;

export const fetchProductsStart = () => {
  return {
    type: FETCH_PRODUCTS_START,
  };
};

export const fetchProductsSuccess = (latestProducts, featuredProducts) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: { latestProducts, featuredProducts },
  };
};

export const fetchProductsFailure = (error) => {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(fetchProductsStart());
    try {
      const latestProductsResponse = await fetch(latestProductsUrl);
      const featuredProductsResponse = await fetch(featuredProductsUrl);
      const latestProducts = await latestProductsResponse.json();
      const featuredProducts = await featuredProductsResponse.json();
      dispatch(fetchProductsSuccess(latestProducts, featuredProducts));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };
};
