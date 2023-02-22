import React from "react";

const NoProduct = () => {
  return (
    <main style={{ textAlign: "center" }}>
      <h2 style={{ color: "red", fontSize: "4rem", marginBottom: "2rem" }}>
        Product not found
      </h2>
      <p style={{ fontSize: "18px", textTransform: "none" }}>
        Sorry, we could not find the product you are looking for...
      </p>
    </main>
  );
};

export default NoProduct;
