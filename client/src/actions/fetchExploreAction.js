import {
  FETCH_EXPLORE_START,
  FETCH_EXPLORE_SUCCESS,
  FETCH_EXPLORE_FAILURE,
} from "./actionTypes";

const key = process.env.REACT_APP_API_KEY;
const dateToday = new Date().toISOString().slice(0, 10);
const dateOneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1))
  .toISOString()
  .slice(0, 10);
const popularProductsUrl = `https://api.rawg.io/api/games?key=${key}&genres=action&metacritic=100`;
const bestProductsUrl = `https://api.rawg.io/api/games?key=${key}&genres=role-playing-games-rpg&metacritic=100`;
const actionProductsUrl = `https://api.rawg.io/api/games?key=${key}&publishers=nintendo&ordering=-metacritic`;
const indieProductsUrl = `https://api.rawg.io/api/games?key=${key}&genres=indie&metacritic=100`;

export const fetchExploreStart = () => {
  return {
    type: FETCH_EXPLORE_START,
  };
};

export const fetchExploreSuccess = (
  popularProducts,
  bestProducts,
  actionProducts,
  indieProducts
) => {
  return {
    type: FETCH_EXPLORE_SUCCESS,
    payload: { popularProducts, bestProducts, actionProducts, indieProducts },
  };
};

export const fetchExploreFailure = (error) => {
  return {
    type: FETCH_EXPLORE_FAILURE,
    payload: error,
  };
};

export const fetchExplore = () => {
  return async (dispatch) => {
    dispatch(fetchExploreStart());
    try {
      const responses = await Promise.all([
        fetch(popularProductsUrl),
        fetch(bestProductsUrl),
        fetch(actionProductsUrl),
        fetch(indieProductsUrl),
      ]);
      const dataPromises = responses.map((response) => response.json());
      const data = await Promise.all(dataPromises);
      dispatch(fetchExploreSuccess(data[0], data[1], data[2], data[3]));
    } catch (error) {
      dispatch(fetchExploreFailure(error.message));
    }
  };
};
