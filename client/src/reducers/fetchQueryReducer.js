import userState from "../store/mainProductState";
import {
  FETCH_QUERY_START,
  FETCH_QUERY_SUCCESS,
  FETCH_QUERY_FAILURE,
} from "../actions/actionTypes";

const fetchQueryReducer = (state = userState, action) => {
  switch (action.type) {
    case FETCH_QUERY_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_QUERY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        queryProducts: action.payload,
      };
    case FETCH_QUERY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default fetchQueryReducer;
