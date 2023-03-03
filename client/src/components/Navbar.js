import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuery } from "../actions";
import Loading from "./Loading";
import { loginUserAction, logoutUserAction } from "../actions";
import LogoutModal from "./LogoutModal";
import { isUserLogged } from "../services/login";

const Navbar = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const queryProducts = useSelector((state) => state.fetchQuery.queryProducts);
  const isLoading = useSelector((state) => state.fetchQuery.isLoading);
  const inputRef = useRef(null);
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);

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

  const verifyUser = async () => {
    const user = await isUserLogged();
    if (user.status === "failure") {
      dispatch(logoutUserAction());
    } else {
      dispatch(loginUserAction());
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <nav className="top-area">
      <div className="header-area">
        <nav
          className="navbar navbar-default bootsnav  navbar-sticky navbar-scrollspy"
          data-minus-value-desktop="70"
          data-minus-value-mobile="55"
          data-speed="1000"
          style={{ backgroundColor: "white" }}
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
                  ref={inputRef}
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
                <li className="search" onClick={() => inputRef.current.focus()}>
                  <a>
                    <span className="lnr lnr-magnifier"></span>
                  </a>
                </li>
                <li className="">
                  {isLoggedIn && (
                    <Link to={"/favorites"}>
                      <span className="lnr lnr-heart"></span>
                    </Link>
                  )}
                </li>
                <li className="dropdown">
                  <a className="dropdown-toggle" data-toggle="dropdown">
                    <span className="lnr lnr-cog"></span>
                  </a>
                  <ul className="dropdown-menu cart-list s-cate">
                    <li>
                      {isLoggedIn ? (
                        <Link to={"/user"} className="dropdown-item">
                          user
                        </Link>
                      ) : (
                        <Link to={"/login"} className="dropdown-item">
                          login
                        </Link>
                      )}
                    </li>
                    {isLoggedIn && (
                      <li>
                        <LogoutModal />
                      </li>
                    )}
                  </ul>
                </li>
              </ul>
            </div>

            <div className="navbar-header" style={{ backgroundColor: "white" }}>
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#navbar-menu"
                aria-controls="navbar-menu"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="fa fa-bars"></i>
              </button>
              <Link to={"/"} className="navbar-brand">
                VGS
              </Link>
            </div>

            <div className="collapse navbar-collapse " id="navbar-menu">
              <div
                className="nav navbar-center navbar-menu-container navbar-expand-lg "
                data-in="fadeInDown"
                data-out="fadeOutUp"
              >
                <ul className="navbar-nav">
                  <li className="nav-item navbar-item">
                    <Link className="nav-link" to={"/"}>
                      home
                    </Link>
                  </li>
                  <li className="nav-item navbar-item">
                    <Link className="nav-link" to={"/"}>
                      explore
                    </Link>
                  </li>
                  <li className="nav-item navbar-item">
                    <Link className="nav-link" to={"/about"}>
                      about
                    </Link>
                  </li>
                </ul>
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
