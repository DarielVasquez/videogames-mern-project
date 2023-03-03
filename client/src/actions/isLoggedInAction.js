import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";

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
