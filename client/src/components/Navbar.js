import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuery } from "../actions";
import LogoutModal from "./LogoutModal";

const Navbar = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  // search query
  const [searchValue, setSearchValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  // fetch query state
  const queryProducts = useSelector((state) => state.fetchQuery.queryProducts);
  const isLoading = useSelector((state) => state.fetchQuery.isLoading);
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);
  // logout modal
  const [showModal, setShowModal] = useState(false);

  // handle changes to search query

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
                  onBlur={() => setTimeout(() => setShowResults(false), 225)}
                />
                <span className="input-group-addon close-search">
                  <i className="fa fa-times"></i>
                </span>
                {showResults && (
                  <div className="search-results">
                    {isLoading ? (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div className="lds-dual-ring-sm"></div>
                      </div>
                    ) : queryProducts?.length === 0 ? (
                      <div className="no-results-found">No results found</div>
                    ) : (
                      queryProducts?.map((result) => (
                        <div key={result.id}>
                          <Link
                            to={`/product/${result.id}`}
                            className="results-found"
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
                        <Link
                          className="dropdown-item"
                          onClick={() => setShowModal(true)}
                        >
                          logout
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
              </ul>
              <LogoutModal showModal={showModal} setShowModal={setShowModal} />
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
                    <Link className="nav-link" to={"/explore"}>
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
