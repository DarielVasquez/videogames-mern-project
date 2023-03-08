import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../services/user";
import { loginUser } from "../services/login";
import { loginUserAction } from "../actions";
import { isUserLogged } from "../services/login";

const SignUp = () => {
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
  // show passwords inputs
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // verify whether user is logged in or not

  const verifyUser = async () => {
    const user = await isUserLogged();
    if (user.status === "success") {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  // handle input changes

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

  // submit data

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
        const loginData = await loginUser({ username, password });
        if (loginData.status === "success") {
          dispatch(loginUserAction());
          navigate("/");
        }
      }
    } else {
      setErrors(newErrors);
    }
  };

  // validate data

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
      <div className="card">
        <div className="card-container">
          <h1 className="card-title">SIGN-UP</h1>
          <form onSubmit={handleSubmit}>
            <div className="card-margin">
              <label htmlFor="name" className="card-label">
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
              <label htmlFor="email" className="card-label">
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
                <div className="show-password" onClick={handleShowPassword}>
                  <span className="lnr lnr-eye"></span>
                </div>
              </div>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="card-margin">
              <label htmlFor="password" className="card-label">
                Confirm password:
              </label>
              <div className="card-pswd-input">
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
                <div
                  className="show-password"
                  onClick={handleShowConfirmPassword}
                >
                  <span className="lnr lnr-eye"></span>
                </div>
              </div>
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>
            <button type="submit" className="submit-button">
              Sign-Up
            </button>
            <div className="center-text">
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
