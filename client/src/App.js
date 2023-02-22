import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Pages
import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";
import About from "./pages/About";
import Error from "./pages/Error";
import Wishlist from "./pages/Wishlist";
//Components
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/product/:id" element={<SingleProduct />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/wishlist" element={<Wishlist />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
