import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { loginUser } from "../services/login";
import { loginUserAction } from "../actions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cookies.get("jwtToken")) {
      navigate("/");
    }
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = await loginUser({ email, password });
    if (loginData.status === "failure") {
      if (loginData.message.includes("email")) {
        setErrors({ email: loginData.message });
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
                htmlFor="email"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Email:
              </label>
              <input
                className={`input-form ${errors.email ? "is-invalid" : ""}`}
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="password"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Password:
              </label>
              <input
                className={`input-form ${errors.password ? "is-invalid" : ""}`}
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
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
