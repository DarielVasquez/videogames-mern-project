import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserById, updateUser, removeUser } from "../services/user";
import { loginUser } from "../services/login";
import { logoutUser } from "../services/logout";
import { logoutUserAction } from "../actions";

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
  const [showModal, setShowModal] = useState(false);
  const [removeUserPassword, setRemoveUserPassword] = useState("");
  const [showRemovePassword, setShowRemovePassword] = useState(false);

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

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChangePassword = () => {
    setChangePassword(!changePassword);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData({ ...formData, password: "", newPassword: "" });
  };

  const handleDeleteClick = async () => {
    const confirmPassword = removeUserPassword;
    const data = await removeUser(confirmPassword);
    if (data.status === "failure") {
      if (data.message.toLowerCase().includes("password")) {
        setErrors({ password: data.message });
      }
    }
    if (data.status === "success") {
      const logout = await logoutUser();
      if (logout.status === "success") {
        dispatch(logoutUserAction());
        setShowModal(!showModal);
        navigate("/");
      }
    }
  };

  const handleSaveClick = async () => {
    const newErrors = validateFormData(formData);
    if (Object.keys(newErrors).length === 0) {
      const { name, username, email, password, newPassword } = formData;
      const data = await updateUser({
        name,
        username,
        email,
        confirmPassword: password,
        password: changePassword ? newPassword : password,
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
        const login = await loginUser({
          username,
          password: changePassword ? newPassword : password,
        });
        setFormData({ ...formData, password: "", newPassword: "" });
        setErrors({});
        setIsEditing(!isEditing);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleCancelClick = () => {
    verifyUser();
    setIsEditing(!isEditing);
    setErrors({});
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
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`input-form ${
                            errors.password ? "is-invalid" : ""
                          }`}
                          style={{
                            border: !isEditing && "1px solid white",
                            borderTopRightRadius: "0",
                            borderBottomRightRadius: "0",
                          }}
                          readOnly={!isEditing}
                          disabled={!isEditing}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
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
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    {changePassword && (
                      <>
                        <div style={{ marginBottom: "20px" }}>
                          <label htmlFor="password">New Password</label>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              className={`input-form ${
                                errors.newPassword ? "is-invalid" : ""
                              }`}
                              style={{
                                border: !isEditing && "1px solid white",
                                borderTopRightRadius: "0",
                                borderBottomRightRadius: "0",
                              }}
                              readOnly={!isEditing}
                              disabled={!isEditing}
                              id="newPassword"
                              name="newPassword"
                              value={formData.newPassword}
                              onChange={handleInputChange}
                            />
                            <div
                              className="show-password"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              <span
                                className="lnr lnr-eye"
                                style={{ cursor: "pointer" }}
                              ></span>
                            </div>
                          </div>
                          {errors.newPassword && (
                            <div className="invalid-feedback">
                              {errors.newPassword}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                    <div
                      onClick={handleChangePassword}
                      className="btn btn-warning"
                      style={{
                        textAlign: "center",
                        margin: "10px 0 15px 0",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {!changePassword ? "Change Password" : "Cancel Change"}
                    </div>
                  </>
                )}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
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
                      marginLeft: "0px",
                    }}
                    onClick={isEditing ? handleSaveClick : handleEditClick}
                  >
                    {isEditing ? "Save" : "Edit"}
                  </div>
                  <div
                    className={`btn btn-${isEditing ? "secondary" : "danger"} `}
                    style={{
                      marginBottom: "20px",
                      display: "block",
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      margin: "10px",
                      marginRight: "0px",
                    }}
                    onClick={() =>
                      isEditing ? handleCancelClick() : setShowModal(!showModal)
                    }
                  >
                    {isEditing ? "Cancel" : "Delete"}
                  </div>
                </div>
              </>
            }
          </div>
        </div>
      </div>
      <div
        className={`modal${showModal ? " d-block modal-backdrop" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ zIndex: "9999" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete</h5>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => setShowModal(!showModal)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Confirm password:
              <div
                style={{ display: "flex", flexDirection: "row", margin: "5px" }}
              >
                <input
                  type={showRemovePassword ? "text" : "password"}
                  className={`input-form ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  style={{
                    borderTopRightRadius: "0",
                    borderBottomRightRadius: "0",
                  }}
                  id="password"
                  name="password"
                  value={removeUserPassword}
                  onChange={(e) => setRemoveUserPassword(e.target.value)}
                />
                <div
                  className="show-password"
                  onClick={() => setShowRemovePassword(!showRemovePassword)}
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
              <p style={{ textTransform: "none", margin: "5px" }}>
                Are you sure you want to delete this account?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(!showModal)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default User;
