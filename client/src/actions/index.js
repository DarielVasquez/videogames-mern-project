export const FETCH_PRODUCTS_START = 'FETCH_PRODUCTS_START';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchProductsStart = () => {
    return {
        type: FETCH_PRODUCTS_START,
    };
  }

export const fetchProductsSuccess = (data) => {
    return {
        type: FETCH_PRODUCTS_SUCCESS, payload: data
    };
};

export const fetchProductsFailure = (error) => {
    return {
        type: FETCH_PRODUCTS_FAILURE, payload: error
    };
};
  
  