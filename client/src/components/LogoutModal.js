import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUserAction } from "../actions";
import { logoutUser } from "../services/logout";

const LogoutModal = ({ showModal, setShowModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handle user logout

  const handleLogout = async () => {
    const logout = await logoutUser();
    dispatch(logoutUserAction());
    setShowModal(!showModal);
    //send user to homepage
    navigate("/");
  };

  return (
    <div
      className={`modal${showModal ? " d-block modal-backdrop" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ zIndex: "9999" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Logout</h5>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => setShowModal(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p style={{ textTransform: "none" }}>
              Are you sure you want to logout?
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
