import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuery } from "../actions";
import Loading from "./Loading";

const Navbar = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const queryProducts = useSelector((state) => state.fetchQuery.queryProducts);
  const isLoading = useSelector((state) => state.fetchQuery.isLoading);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    if (searchValue) {
      setShowResults(true);
      dispatch(fetchQuery(searchValue));
    }

    if (searchValue === "") {
      setShowResults(false);
    }
  }, [searchValue]);

  return (
    <nav className="top-area">
      <div className="header-area">
        <nav
          className="navbar navbar-default bootsnav  navbar-sticky navbar-scrollspy"
          data-minus-value-desktop="70"
          data-minus-value-mobile="55"
          data-speed="1000"
        >
          <div className="top-search">
            <div className="container">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  name="search"
                  placeholder="Search"
                  value={searchValue}
                  autoComplete="off"
                  onChange={handleChange}
                  onFocus={() => searchValue.length && setShowResults(true)}
                  onBlur={() => setTimeout(() => setShowResults(false), 200)}
                />
                <span className="input-group-addon close-search">
                  <i className="fa fa-times"></i>
                </span>
                {showResults && (
                  <div
                    style={{
                      position: "absolute",
                      top: "60px",
                      left: "10%",
                      right: "10%",
                      zIndex: 1,
                      background: "#fff",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      boxShadow: "0 2px 4px rgba(0,0,0,.1)",
                      maxHeight: "300px",
                      overflowY: "auto",
                      padding: "10px",
                      width: "80%",
                    }}
                  >
                    {isLoading ? (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div className="lds-dual-ring-sm"></div>
                      </div>
                    ) : queryProducts?.length === 0 ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          padding: "10px",
                        }}
                      >
                        "No results available...
                      </div>
                    ) : (
                      queryProducts?.map((result) => (
                        <div key={result.id}>
                          <Link
                            to={`/product/${result.id}`}
                            style={{
                              textAlign: "center",
                              fontSize: "16px",
                              color: "#a09e9c",
                              padding: "5px",
                            }}
                            onClick={() => setShowResults(false)}
                          >
                            {result.name}
                          </Link>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="container">
            <div className="attr-nav">
              <ul>
                <li className="search">
                  <a href="#">
                    <span className="lnr lnr-magnifier"></span>
                  </a>
                </li>
                <li className="nav-setting">
                  <a href="#">
                    <span className="lnr lnr-heart"></span>
                  </a>
                </li>
                <li className="nav-setting">
                  <a href="#">
                    <span className="lnr lnr-cog"></span>
                  </a>
                </li>
                {/* <li className="dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <span className="lnr lnr-cart"></span>
                    <span className="badge badge-bg-1">2</span>
                  </a>
                  <ul className="dropdown-menu cart-list s-cate">
                    <li className="single-cart-list">
                      <a href="#" className="photo">
                        <img
                          src="assets/images/collection/arrivals1.png"
                          className="cart-thumb"
                          alt="image"
                        />
                      </a>
                      <div className="cart-list-txt">
                        <h6>
                          <a href="#">
                            arm <br /> chair
                          </a>
                        </h6>
                        <p>
                          1 x - <span className="price">$180.00</span>
                        </p>
                      </div>
                      <div className="cart-close">
                        <span className="lnr lnr-cross"></span>
                      </div>
                    </li>
                    <li className="single-cart-list">
                      <a href="#" className="photo">
                        <img
                          src="assets/images/collection/arrivals2.png"
                          className="cart-thumb"
                          alt="image"
                        />
                      </a>
                      <div className="cart-list-txt">
                        <h6>
                          <a href="#">
                            single <br /> armchair
                          </a>
                        </h6>
                        <p>
                          1 x - <span className="price">$180.00</span>
                        </p>
                      </div>
                      <div className="cart-close">
                        <span className="lnr lnr-cross"></span>
                      </div>
                    </li>
                    <li className="single-cart-list">
                      <a href="#" className="photo">
                        <img
                          src="assets/images/collection/arrivals3.png"
                          className="cart-thumb"
                          alt="image"
                        />
                      </a>
                      <div className="cart-list-txt">
                        <h6>
                          <a href="#">
                            wooden arn <br /> chair
                          </a>
                        </h6>
                        <p>
                          1 x - <span className="price">$180.00</span>
                        </p>
                      </div>
                      <div className="cart-close">
                        <span className="lnr lnr-cross"></span>
                      </div>
                    </li>
                    <li className="total">
                      <span>Total: $0.00</span>
                      <button
                        className="btn-cart pull-right"
                        // onClick="window.location.href='#'"
                      >
                        view cart
                      </button>
                    </li>
                  </ul>
                </li> */}
              </ul>
            </div>

            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#navbar-menu"
              >
                <i className="fa fa-bars"></i>
              </button>
              <Link to={"/"} className="navbar-brand">
                VGS
              </Link>
            </div>

            <div
              className="collapse navbar-collapse menu-ui-design"
              id="navbar-menu"
            >
              <div
                className="nav navbar-center"
                data-in="fadeInDown"
                data-out="fadeOutUp"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: "10px",
                }}
              >
                <Link
                  to={"/"}
                  style={{
                    display: "inline-block",
                    padding: "35px",
                    fontSize: "18px",
                  }}
                >
                  Home
                </Link>
                <Link
                  to={"/"}
                  style={{
                    display: "inline-block",
                    padding: "35px",
                    fontSize: "18px",
                  }}
                >
                  Games
                </Link>
                <NavLink
                  to={"/favorites"}
                  style={{
                    display: "inline-block",
                    padding: "35px",
                    fontSize: "18px",
                  }}
                >
                  Favorites
                </NavLink>
                <Link
                  to={"/"}
                  style={{
                    display: "inline-block",
                    padding: "35px",
                    fontSize: "18px",
                  }}
                >
                  About
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="clearfix"></div>
    </nav>
  );
};

export default Navbar;
