import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserById, updateUser, removeUser } from "../services/user";
import { loginUser } from "../services/login";
import { logoutUser } from "../services/logout";
import { logoutUserAction } from "../actions";
import Alerts from "../components/Alerts";

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
  // change password
  const [changePassword, setChangePassword] = useState(false);
  // show passwords in input field
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // delete user modal
  const [showModal, setShowModal] = useState(false);
  const [removeUserPassword, setRemoveUserPassword] = useState("");
  const [showRemovePassword, setShowRemovePassword] = useState(false);
  // alerts
  const [alerts, setAlerts] = useState([]);

  // verify user

  const verifyUser = async () => {
    const user = await getUserById();
    const { name, username, email } = user.user;
    setFormData({ ...formData, name: name, username: username, email: email });
  };

  useEffect(() => {
    verifyUser();
  }, []);

  // inputs form

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // edit user button

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData({ ...formData, password: "", newPassword: "" });
  };

  // delete user button

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

  // save changes button

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
        setAlerts((alerts) => [...alerts, data]);
      }
    } else {
      setErrors(newErrors);
    }
  };

  // cancel edit button

  const handleCancelClick = () => {
    verifyUser();
    setIsEditing(!isEditing);
    setErrors({});
  };

  // validate form

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

  // alert message

  useEffect(() => {
    const timer = setTimeout(() => {
      if (alerts.length > 0) {
        setAlerts(alerts.slice(1));
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [alerts]);

  return (
    <main>
      <Alerts alerts={alerts} setAlerts={setAlerts} />
      <div className="card">
        <div className="card-container">
          <div className="user-card">
            <h1 className="user-card-title">User Profile</h1>
            {
              <>
                <div className="card-margin">
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
                <div className="card-margin">
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
                <div className="card-margin">
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
                    <div className="card-margin">
                      <label htmlFor="password">
                        {changePassword ? `Old Password` : `Confirm Password:`}
                      </label>
                      <div className="card-pswd-input">
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
                          <span className="lnr lnr-eye"></span>
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
                        <div className="card-margin">
                          <label htmlFor="password">New Password</label>
                          <div className="card-pswd-input">
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
                              <span className="lnr lnr-eye"></span>
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
                      onClick={() => setChangePassword(!changePassword)}
                      className="btn btn-warning user-change-pswd-button"
                    >
                      {!changePassword ? "Change Password" : "Cancel Change"}
                    </div>
                  </>
                )}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    className="btn btn-primary mr-2 user-btn-primary"
                    onClick={isEditing ? handleSaveClick : handleEditClick}
                  >
                    {isEditing ? "Save" : "Edit"}
                  </div>
                  <div
                    className={`btn btn-${
                      isEditing ? "secondary" : "danger"
                    } user-btn-secondary`}
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
              <div className="modal-body-input">
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
                  <span className="lnr lnr-eye"></span>
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
