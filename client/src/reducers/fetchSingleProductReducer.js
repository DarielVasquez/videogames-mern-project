import singleProductState from '../store/singleProductState';
import {
    FETCH_SINGLE_PRODUCT_START,
    FETCH_SINGLE_PRODUCT_SUCCESS,
    FETCH_SINGLE_PRODUCT_FAILURE
} from '../actions/actionTypes'

const fetchSingleProductReducer = (state = singleProductState, action) => {
    switch (action.type) {
        case FETCH_SINGLE_PRODUCT_START:
          return {
            ...state,
            isLoading: true,
            error: null,
          };
        case FETCH_SINGLE_PRODUCT_SUCCESS:
          return {
            ...state,
            isLoading: false,
            singleProduct: action.payload,
          };
        case FETCH_SINGLE_PRODUCT_FAILURE:
          return {
            ...state,
            isLoading: false,
            error: action.payload,
          };
        default:
          return state;
      }
}

export default fetchSingleProductReducer;