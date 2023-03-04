import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../services/login";
import { loginUserAction } from "../actions";
import { isUserLogged } from "../services/login";

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

  return (
    <main>
      <div
        style={{
          position: "relative",
          marginTop: "130px",
          marginBottom: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "50px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>LOGIN</h1>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="username"
                style={{ display: "block", marginBottom: "5px" }}
              >
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
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="password"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Password:
              </label>
              <div style={{ display: "flex", flexDirection: "row" }}>
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
                  <span
                    className="lnr lnr-eye"
                    style={{ cursor: "pointer" }}
                  ></span>
                </div>
              </div>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <button
              type="submit"
              style={{
                marginBottom: "20px",
                display: "block",
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#e99c2e",
                color: "#fff",
                border: "none",
              }}
            >
              Login
            </button>
            <div style={{ textAlign: "center" }}>
              <Link to={"/signup"} style={{ textTransform: "none" }}>
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
