import React from "react";

const Loading = () => {
  return (
    <div
      className="loading"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default Loading;
