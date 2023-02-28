import React from "react";
import { useState } from "react";
import { loginUser } from "../services/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = await loginUser({ email, password });
    console.log(loginData);
  };
  return (
    <main>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
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
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h1>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="email"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="password"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#e99c2e",
                color: "#fff",
                border: "none",
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
