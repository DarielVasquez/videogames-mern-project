import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchExplore } from "../actions";
import Loading from "../components/Loading";
import Alerts from "../components/Alerts";

const Explore = () => {
  const dispatch = useDispatch();

  // all products
  const allPopularProducts = useSelector(
    (state) => state.fetchExplore.popularProducts
  );
  const allBestProducts = useSelector(
    (state) => state.fetchExplore.bestProducts
  );
  const allActionProducts = useSelector(
    (state) => state.fetchExplore.actionProducts
  );
  const allIndieProducts = useSelector(
    (state) => state.fetchExplore.indieProducts
  );
  const isLoading = useSelector((state) => state.fetchExplore.isLoading);
  // alerts
  const [alerts, setAlerts] = useState([]);

  // fetch data

  useEffect(() => {
    dispatch(fetchExplore());
  }, [fetchExplore]);

  const popularProducts = allPopularProducts.results;
  const bestProducts = allBestProducts.results;
  const actionProducts = allActionProducts.results;
  const indieProducts = allIndieProducts.results;

  console.log(popularProducts);
  console.log(bestProducts);
  console.log(actionProducts);
  console.log(indieProducts);

  if (isLoading) {
    return <Loading />;
  } else
    return (
      <main>
        <h1>Explore Video Games</h1>
        <p>Discover and play new games</p>
        {/* highest rated */}
        <section id="new-arrivals" className="new-arrivals">
          <div className="container">
            <div className="section-header">
              <h2>highest rated</h2>
            </div>
            <div className="new-arrivals-content">
              <div className="row">
                {popularProducts?.slice(0, 12).map((product) => {
                  const { id, name, background_image } = product;
                  return (
                    <div key={id} className="col-md-3 col-sm-4">
                      <div className="single-new-arrival">
                        <div className="single-new-arrival-bg white-background">
                          <img
                            src={background_image}
                            alt={name}
                            style={{ height: "250px", objectFit: "cover" }}
                          />
                          <div className="single-new-arrival-bg-overlay"></div>
                          <div className="new-arrival-cart">
                            <p
                              style={{
                                cursor: "pointer",
                              }}
                              // onClick={() =>
                              //   handleAddFavorite({
                              //     id,
                              //   })
                              // }
                            >
                              <span
                                className="lnr lnr-heart"
                                style={{
                                  paddingRight: "5px",
                                  cursor: "pointer",
                                }}
                              ></span>
                              add <span>to </span> favorites
                            </p>
                            <p className="arrival-review pull-right">
                              <span className="lnr lnr-frame-expand"></span>
                            </p>
                          </div>
                        </div>
                        <h4>
                          <Link
                            to={`product/${id}`}
                            style={{
                              textAlign: "center",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              display: "block",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {name.length > 50
                              ? `${name.substring(0, 50).trim()}...`
                              : name}
                          </Link>
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        {/* best of all time */}
        <section id="new-arrivals" className="new-arrivals">
          <div className="container">
            <div className="section-header">
              <h2>best of all time</h2>
            </div>
            <div className="new-arrivals-content">
              <div className="row">
                {bestProducts?.slice(0, 12).map((product) => {
                  const { id, name, background_image } = product;
                  return (
                    <div key={id} className="col-md-3 col-sm-4">
                      <div className="single-new-arrival">
                        <div className="single-new-arrival-bg white-background">
                          <img
                            src={background_image}
                            alt={name}
                            style={{ height: "250px", objectFit: "cover" }}
                          />
                          <div className="single-new-arrival-bg-overlay"></div>
                          <div className="new-arrival-cart">
                            <p
                              style={{
                                cursor: "pointer",
                              }}
                              // onClick={() =>
                              //   handleAddFavorite({
                              //     id,
                              //   })
                              // }
                            >
                              <span
                                className="lnr lnr-heart"
                                style={{
                                  paddingRight: "5px",
                                  cursor: "pointer",
                                }}
                              ></span>
                              add <span>to </span> favorites
                            </p>
                            <p className="arrival-review pull-right">
                              <span className="lnr lnr-frame-expand"></span>
                            </p>
                          </div>
                        </div>
                        <h4>
                          <Link
                            to={`product/${id}`}
                            style={{
                              textAlign: "center",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              display: "block",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {name.length > 50
                              ? `${name.substring(0, 50).trim()}...`
                              : name}
                          </Link>
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        {/* shooters */}
        <section id="new-arrivals" className="new-arrivals">
          <div className="container">
            <div className="section-header">
              <h2>shooters</h2>
            </div>
            <div className="new-arrivals-content">
              <div className="row">
                {actionProducts?.slice(0, 12).map((product) => {
                  const { id, name, background_image } = product;
                  return (
                    <div key={id} className="col-md-3 col-sm-4">
                      <div className="single-new-arrival">
                        <div className="single-new-arrival-bg white-background">
                          <img
                            src={background_image}
                            alt={name}
                            style={{ height: "250px", objectFit: "cover" }}
                          />
                          <div className="single-new-arrival-bg-overlay"></div>
                          <div className="new-arrival-cart">
                            <p
                              style={{
                                cursor: "pointer",
                              }}
                              // onClick={() =>
                              //   handleAddFavorite({
                              //     id,
                              //   })
                              // }
                            >
                              <span
                                className="lnr lnr-heart"
                                style={{
                                  paddingRight: "5px",
                                  cursor: "pointer",
                                }}
                              ></span>
                              add <span>to </span> favorites
                            </p>
                            <p className="arrival-review pull-right">
                              <span className="lnr lnr-frame-expand"></span>
                            </p>
                          </div>
                        </div>
                        <h4>
                          <Link
                            to={`product/${id}`}
                            style={{
                              textAlign: "center",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              display: "block",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {name.length > 50
                              ? `${name.substring(0, 50).trim()}...`
                              : name}
                          </Link>
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        {/* indies */}
        <section id="new-arrivals" className="new-arrivals">
          <div className="container">
            <div className="section-header">
              <h2>indies</h2>
            </div>
            <div className="new-arrivals-content">
              <div className="row">
                {indieProducts?.slice(0, 12).map((product) => {
                  const { id, name, background_image } = product;
                  return (
                    <div key={id} className="col-md-3 col-sm-4">
                      <div className="single-new-arrival">
                        <div className="single-new-arrival-bg white-background">
                          <img
                            src={background_image}
                            alt={name}
                            style={{ height: "250px", objectFit: "cover" }}
                          />
                          <div className="single-new-arrival-bg-overlay"></div>
                          <div className="new-arrival-cart">
                            <p
                              style={{
                                cursor: "pointer",
                              }}
                              // onClick={() =>
                              //   handleAddFavorite({
                              //     id,
                              //   })
                              // }
                            >
                              <span
                                className="lnr lnr-heart"
                                style={{
                                  paddingRight: "5px",
                                  cursor: "pointer",
                                }}
                              ></span>
                              add <span>to </span> favorites
                            </p>
                            <p className="arrival-review pull-right">
                              <span className="lnr lnr-frame-expand"></span>
                            </p>
                          </div>
                        </div>
                        <h4>
                          <Link
                            to={`product/${id}`}
                            style={{
                              textAlign: "center",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              display: "block",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {name.length > 50
                              ? `${name.substring(0, 50).trim()}...`
                              : name}
                          </Link>
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    );
};

export default Explore;
