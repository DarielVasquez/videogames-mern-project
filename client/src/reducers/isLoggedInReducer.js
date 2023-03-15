import isLoggedInState from "../store/isLoggedInState";
import { LOGIN_OAUTH, LOGIN_USER, LOGOUT_USER } from "../actions/actionTypes";

const isLoggedInReducer = (state = isLoggedInState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isLoggedIn: true,
        isOAuth: false,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
        isOAuth: false,
      };
    case LOGIN_OAUTH:
      return {
        ...state,
        isLoggedIn: true,
        isOAuth: true,
      };
    default:
      return state;
  }
};

export default isLoggedInReducer;
