import mainProductState from "../store/mainProductState";
import {
  FETCH_MAIN_PRODUCT_START,
  FETCH_MAIN_PRODUCT_SUCCESS,
  FETCH_MAIN_PRODUCT_FAILURE,
} from "../actions/actionTypes";

const mainProductReducer = (state = mainProductState, action) => {
  switch (action.type) {
    case FETCH_MAIN_PRODUCT_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_MAIN_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mainProduct: action.payload,
      };
    case FETCH_MAIN_PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default mainProductReducer;
