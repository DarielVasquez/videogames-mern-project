import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../actions";
import { logoutUser } from "../services/logout";

const LogoutModal = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  const handleLogout = async () => {
    const logout = await logoutUser();
    if (mounted) {
      dispatch(logoutUserAction());
      setShowModal((prevState) => !prevState);
    }
  };

  return (
    <>
      <Link
        to={"/"}
        className="dropdown-item"
        onClick={() => setShowModal(true)}
      >
        logout
      </Link>
      <div
        className={`modal${showModal ? " d-block modal-backdrop" : ""}`}
        tabIndex="-1"
        role="dialog"
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
    </>
  );
};

export default LogoutModal;
