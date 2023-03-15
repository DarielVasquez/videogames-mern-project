import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, loginUserOAuth } from "../services/login";
import { loginUserAction } from "../actions";
import { isUserLogged } from "../services/login";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const verifyUser = async () => {
    const user = await isUserLogged();
    if (user.status === "success") {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
    const loginData = await loginUser({ username, password });
    if (loginData.status === "failure") {
      if (loginData.message.includes("username")) {
        setErrors({ username: loginData.message });
      }
      if (loginData.message.includes("password")) {
        setErrors({ password: loginData.message });
      }
    }
    if (loginData.status === "success") {
      setErrors({});
      dispatch(loginUserAction());
      navigate("/");
    }
  };

  const responseGoogle = async (response) => {
    const loginResult = await loginUserOAuth(response);
    if (loginResult.status === "success") {
      dispatch(loginUserAction());
      navigate("/");
    }
  };

  return (
    <main>
      <div className="card">
        <div className="card-container">
          <h1 className="card-title">LOGIN</h1>
          <form onSubmit={handleSubmit}>
            <div className="card-margin">
              <label htmlFor="username" className="card-label">
                Username:
              </label>
              <input
                className={`input-form ${errors.username ? "is-invalid" : ""}`}
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>
            <div className="card-margin">
              <label htmlFor="password" className="card-label">
                Password:
              </label>
              <div className="card-pswd-input">
                <input
                  className={`input-form ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{
                    borderTopRightRadius: "0",
                    borderBottomRightRadius: "0",
                  }}
                />
                <div
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="lnr lnr-eye"></span>
                </div>
              </div>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <button type="submit" className="submit-button">
              Login
            </button>
            <div className="center-text">
              <Link to={"/signup"} style={{ textTransform: "none" }}>
                Create an Account
              </Link>
            </div>
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
