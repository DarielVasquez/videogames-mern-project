import isLoggedInState from "../store/isLoggedInState";
import { LOGIN_USER, LOGOUT_USER } from "../actions/actionTypes";

const isLoggedInReducer = (state = isLoggedInState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default isLoggedInReducer;
