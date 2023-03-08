import { combineReducers } from "redux";
import fetchProductsReducer from "./fetchProductsReducer";
import fetchMainProductReducer from "./fetchMainProductReducer";
import fetchExploreReducer from "./fetchExploreReducer";
import fetchSingleProductReducer from "./fetchSingleProductReducer";
import fetchQueryReducer from "./fetchQueryReducer";
import isLoggedInReducer from "./isLoggedInReducer";

const allReducers = combineReducers({
  fetchProducts: fetchProductsReducer,
  fetchExplore: fetchExploreReducer,
  fetchSingleProduct: fetchSingleProductReducer,
  fetchMainProduct: fetchMainProductReducer,
  fetchQuery: fetchQueryReducer,
  isLoggedIn: isLoggedInReducer,
});

export default allReducers;
