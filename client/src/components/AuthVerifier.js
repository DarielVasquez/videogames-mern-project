import { useEffect } from "react";
import {
  loginUserAction,
  logoutUserAction,
  loginOAuthAction,
} from "../actions";
import { isUserLogged } from "../services/login";
import { useDispatch, useSelector } from "react-redux";

const AuthVerifier = () => {
  const dispatch = useDispatch();
  const verifyUser = async () => {
    const user = await isUserLogged();
    if (user.status === "failure") {
      dispatch(logoutUserAction());
    } else {
      user.isOAuth ? dispatch(loginOAuthAction()) : dispatch(loginUserAction());
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);
  return null;
};

export default AuthVerifier;
