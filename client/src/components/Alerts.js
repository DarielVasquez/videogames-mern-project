import React from "react";

const Alerts = ({ alerts, setAlerts }) => {
  return (
    <div className="alerts-container">
      {alerts.length > 0 &&
        alerts.map((alert, index) => {
          const { status, message } = alert;
          return (
            <div key={index} className="alerts-box">
              <div
                className={`alert alert-${
                  status === "success" ? "success" : "danger"
                }`}
                role="alert"
              >
                {message}
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={() =>
                    setAlerts((alerts) => alerts.filter((_, i) => i !== index))
                  }
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Alerts;
