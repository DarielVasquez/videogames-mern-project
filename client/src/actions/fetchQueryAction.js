import {
  FETCH_QUERY_START,
  FETCH_QUERY_SUCCESS,
  FETCH_QUERY_FAILURE,
} from "./actionTypes";

const key = process.env.REACT_APP_API_KEY;
const queryUrl = `https://api.rawg.io/api/games?key=${key}&query=`;

export const fetchQueryStart = () => {
  return {
    type: FETCH_QUERY_START,
  };
};

export const fetchQuerySuccess = (products) => {
  return {
    type: FETCH_QUERY_SUCCESS,
    payload: { products },
  };
};

export const fetchQueryFailure = (error) => {
  return {
    type: FETCH_QUERY_FAILURE,
    payload: error,
  };
};

export const fetchQuery = (query) => {
  return async (dispatch) => {
    dispatch(fetchQueryStart());
    try {
      const response = await fetch(queryUrl + query);
      const products = await response.json();
      dispatch(fetchQuerySuccess(products));
    } catch (error) {
      dispatch(fetchQueryFailure(error.message));
    }
  };
};
