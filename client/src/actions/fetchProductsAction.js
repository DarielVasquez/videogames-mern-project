import {
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE
} from './actionTypes';

const key='ca9dd90e0e4848d4bf202e5bde6fdc3c';
const dateToday = new Date().toISOString().slice(0, 10)
const dateOneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 10);
const popularProductsUrl = `https://api.rawg.io/api/games?key=${key}&metacritic=100`
const latestProductsUrl = `https://api.rawg.io/api/games?key=${key}&dates=${dateOneMonthAgo},${dateToday}`
const featuredProductsUrl = `https://api.rawg.io/api/games?key=${key}&ordering=-rating&dates=${dateOneMonthAgo},${dateToday}`

export const fetchProductsStart = () => {
    return {
        type: FETCH_PRODUCTS_START,
    };
  }

export const fetchProductsSuccess = (popularProducts, latestProducts, featuredProducts) => {
    return {
        type: FETCH_PRODUCTS_SUCCESS, payload: {popularProducts, latestProducts, featuredProducts}
    };
};

export const fetchProductsFailure = (error) => {
    return {
        type: FETCH_PRODUCTS_FAILURE, payload: error
    };
};
  
export const fetchProducts = () => {
    return async (dispatch) => {
      dispatch(fetchProductsStart());
      try {
        const popularProductsResponse = await fetch(popularProductsUrl);
        const latestProductsResponse = await fetch(latestProductsUrl);
        const featuredProductsResponse = await fetch(featuredProductsUrl);
        const popularProducts = await popularProductsResponse.json();
        const latestProducts = await latestProductsResponse.json();
        const featuredProducts = await featuredProductsResponse.json();
        dispatch(fetchProductsSuccess(popularProducts, latestProducts, featuredProducts));
      } catch (error) {
        dispatch(fetchProductsFailure(error.message));
      }
    };
  };