import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
//Pages
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Error from "./pages/Error";
import User from "./pages/User";
import SingleProduct from "./pages/SingleProduct";
import Favorites from "./pages/Favorites";
//Components
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer";
import AuthVerifier from "./components/AuthVerifier";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <AuthVerifier />
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/product/:id" element={<SingleProduct />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
        <Footer />
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
