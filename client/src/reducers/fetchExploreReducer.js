import exploreState from "../store/exploreState";
import {
  FETCH_EXPLORE_START,
  FETCH_EXPLORE_SUCCESS,
  FETCH_EXPLORE_FAILURE,
} from "../actions/actionTypes";

const fetchExploreReducer = (state = exploreState, action) => {
  switch (action.type) {
    case FETCH_EXPLORE_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_EXPLORE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        popularProducts: action.payload.popularProducts,
        bestProducts: action.payload.bestProducts,
        actionProducts: action.payload.actionProducts,
        indieProducts: action.payload.indieProducts,
      };
    case FETCH_EXPLORE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default fetchExploreReducer;
