import { combineReducers } from "redux";
import fetchProductsReducer from "./fetchProductsReducer";
import fetchSingleProductReducer from "./fetchSingleProductReducer";
import fetchMainProductReducer from "./fetchMainProductReducer";
import fetchQueryReducer from "./fetchQueryReducer";

const allReducers = combineReducers({
  fetchProducts: fetchProductsReducer,
  fetchSingleProduct: fetchSingleProductReducer,
  fetchMainProduct: fetchMainProductReducer,
  fetchQuery: fetchQueryReducer,
});

export default allReducers;
