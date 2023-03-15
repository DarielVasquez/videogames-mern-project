import { LOGIN_OAUTH, LOGIN_USER, LOGOUT_USER } from "./actionTypes";

export const loginUserAction = () => {
  return {
    type: LOGIN_USER,
  };
};

export const logoutUserAction = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const loginOAuthAction = () => {
  return {
    type: LOGIN_OAUTH,
  };
};
