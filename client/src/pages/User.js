import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserById, updateUser, removeUser } from "../services/user";
import { loginUser } from "../services/login";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [changePassword, setChangePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const verifyUser = async () => {
    const user = await getUserById();
    const { name, username, email } = user.user;
    setFormData({ ...formData, name: name, username: username, email: email });
  };

  useEffect(() => {
    verifyUser();
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

  const handleChangePassword = () => {
    setChangePassword(!changePassword);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    // code to delete user
  };

  const handleSaveClick = async () => {
    const newErrors = validateFormData(formData);
    if (Object.keys(newErrors).length === 0) {
      const { name, username, email, password, newPassword } = formData;
      if (!changePassword) {
        const data = await updateUser({
          name,
          username,
          email,
          confirmPassword: password,
          password: password,
        });
        if (data.status === "failure") {
          if (data.message.toLowerCase().includes("password")) {
            setErrors({ password: data.message });
          }
          if (data.message.toLowerCase().includes("username")) {
            setErrors({ username: data.message });
          }
          if (data.message.toLowerCase().includes("email")) {
            setErrors({ email: data.message });
          }
        }
        if (data.status === "success") {
          const login = await loginUser({ username, password });
          setFormData({ ...formData, password: "", newPassword: "" });
          setErrors({});
          setIsEditing(!isEditing);
        }
      } else {
        const data = await updateUser({
          name,
          username,
          email,
          confirmPassword: password,
          password: newPassword,
        });
        if (data.status === "failure") {
          if (data.message.toLowerCase().includes("username")) {
            setErrors({ username: data.message });
          }
          if (data.message.toLowerCase().includes("email")) {
            setErrors({ email: data.message });
          }
          if (data.message.toLowerCase().includes("password")) {
            setErrors({ password: data.message });
          }
        }
        if (data.status === "success") {
          const login = await loginUser({ username, password: newPassword });
          setFormData({ ...formData, password: "", newPassword: "" });
          setErrors({});
          setIsEditing(!isEditing);
        }
      }
      // const signupData = await addUser(data);
      // if (signupData.status === "success") {
      //   const loginData = await loginUser({ username, password });
      //   if (loginData.status === "success") {
      //     dispatch(loginUserAction());
      //     navigate("/");
      //   }
      // }
    } else {
      setErrors(newErrors);
    }
    // setIsEditing(false);
  };

  const handleCancelClick = () => {
    verifyUser();
    setIsEditing(false);
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
    }
    if (changePassword) {
      if (!data.newPassword) {
        errors.newPassword = "New password is required";
      } else if (data.newPassword.length < 6) {
        errors.newPassword = "New password must be at least 6 characters";
      }
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
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h1 style={{ textAlign: "center", padding: "20px" }}>
              User Profile
            </h1>
            {
              <>
                <div style={{ marginBottom: "20px" }}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className={`input-form ${errors.name ? "is-invalid" : ""}`}
                    style={{ border: !isEditing && "1px solid white" }}
                    readOnly={!isEditing}
                    disabled={!isEditing}
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
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className={`input-form ${
                      errors.username ? "is-invalid" : ""
                    }`}
                    style={{ border: !isEditing && "1px solid white" }}
                    readOnly={!isEditing}
                    disabled={!isEditing}
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
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className={`input-form ${errors.email ? "is-invalid" : ""}`}
                    style={{ border: !isEditing && "1px solid white" }}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                {isEditing && (
                  <>
                    <div style={{ marginBottom: "20px" }}>
                      <label htmlFor="password">
                        {changePassword ? `Old Password` : `Confirm Password:`}
                      </label>
                      <input
                        type="password"
                        className={`input-form ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        style={{ border: !isEditing && "1px solid white" }}
                        readOnly={!isEditing}
                        disabled={!isEditing}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <button type="button" onClick={handleChangePassword}>
                      Change Password
                    </button>
                    {changePassword && (
                      <>
                        <div style={{ marginBottom: "20px" }}>
                          <label htmlFor="password">New Password</label>
                          <input
                            type="password"
                            className={`input-form ${
                              errors.newPassword ? "is-invalid" : ""
                            }`}
                            style={{ border: !isEditing && "1px solid white" }}
                            readOnly={!isEditing}
                            disabled={!isEditing}
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                          />
                          {errors.newPassword && (
                            <div className="invalid-feedback">
                              {errors.newPassword}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </>
                )}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    className="btn btn-primary mr-2"
                    style={{
                      marginBottom: "20px",
                      display: "block",
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      color: "#fff",
                      border: "none",
                      margin: "10px",
                    }}
                    onClick={() =>
                      isEditing ? handleSaveClick() : handleEditClick()
                    }
                  >
                    {isEditing ? "Save" : "Edit"}
                  </button>
                  <button
                    className="btn btn-secondary"
                    style={{
                      marginBottom: "20px",
                      display: "block",
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      margin: "10px",
                    }}
                    onClick={() =>
                      isEditing ? handleCancelClick() : handleDeleteClick()
                    }
                  >
                    {isEditing ? "Cancel" : "Delete"}
                  </button>
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </main>
  );
};

export default User;
