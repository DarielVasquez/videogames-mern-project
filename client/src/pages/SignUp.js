import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { addUser } from "../services/user";
import { loginUser } from "../services/login";
import { loginUserAction } from "../actions";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (cookies.get("jwtToken")) {
      navigate("/");
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateFormData(formData);
    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      const { name, username, email, password } = formData;
      const data = {
        name,
        username,
        email,
        password,
      };
      const signupData = await addUser(data);
      if (signupData.status === "failure") {
        if (signupData.message.includes("Username")) {
          setErrors({ username: signupData.message });
        }
        if (signupData.message.includes("Email")) {
          setErrors({ email: signupData.message });
        }
      }
      if (signupData.status === "success") {
        const loginData = await loginUser({ email, password });
        if (loginData.status === "success") {
          dispatch(loginUserAction());
          navigate("/");
        }
      }
      if (signupData.status === "success") console.log("Form data submitted!");
    } else {
      setErrors(newErrors);
    }
  };

  const validateFormData = (data) => {
    const errors = {};
    if (!data.name) {
      errors.name = "Name is required";
    }
    if (!data.username) {
      errors.username = "Username is required";
    }
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }
    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
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
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>SIGN-UP</h1>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="name"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Name:
              </label>
              <input
                className={`input-form ${errors.name ? "is-invalid" : ""}`}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
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
                value={formData.email}
                onChange={handleInputChange}
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
                <button className="show-password" onClick={handleShowPassword}>
                  <span
                    className="lnr lnr-eye"
                    style={{ cursor: "pointer" }}
                  ></span>
                </button>
              </div>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="password"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Confirm password:
              </label>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <input
                  className={`input-form ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  style={{
                    borderTopRightRadius: "0",
                    borderBottomRightRadius: "0",
                  }}
                />
                <button
                  className="show-password"
                  onClick={handleShowConfirmPassword}
                >
                  <span
                    className="lnr lnr-eye"
                    style={{ cursor: "pointer" }}
                  ></span>
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
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
              Sign-Up
            </button>
            <div style={{ textAlign: "center" }}>
              <Link to={"/login"} style={{ textTransform: "none" }}>
                Already have an Account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
