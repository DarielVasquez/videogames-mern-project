import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchExplore } from "../actions";
import Loading from "../components/Loading";
import Alerts from "../components/Alerts";
import { addFavorite } from "../services/favorites";
import { fetchSingleProduct } from "../actions";

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

  // add to favorites

  const singleProduct = useSelector(
    (state) => state.fetchSingleProduct.singleProduct
  );
  const [clicked, setClicked] = useState(false);

  const handleAddFavorite = async ({ id }) => {
    setClicked(true);
    dispatch(fetchSingleProduct(id));
  };

  useEffect(() => {
    if (clicked && singleProduct) {
      const dataGame = {
        gameId: singleProduct.id,
        gameName: singleProduct.name,
        gameImg: singleProduct.background_image,
        gameDesc: singleProduct.description_raw,
      };
      const addFavoriteData = async () => {
        const request = await addFavorite(dataGame);
        setAlerts((alerts) => [...alerts, request]);
      };
      addFavoriteData();
    }
  }, [singleProduct]);

  // alert message

  useEffect(() => {
    const timer = setTimeout(() => {
      if (alerts.length > 0) {
        //remove the first message after 2s
        setAlerts(alerts.slice(1));
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [alerts]);

  if (isLoading) {
    return <Loading />;
  } else
    return (
      <main>
        <Alerts alerts={alerts} setAlerts={setAlerts} />
        <h1>Explore Video Games</h1>
        <p>Discover and play new games</p>
        {/* popular picks */}
        <section id="new-arrivals" className="new-arrivals">
          <div className="container">
            <div className="section-header">
              <h2>Popular Picks</h2>
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
                              onClick={() =>
                                handleAddFavorite({
                                  id,
                                })
                              }
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
                            to={`/product/${id}`}
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
        {/* popular RPGs */}
        <section id="new-arrivals" className="new-arrivals">
          <div className="container">
            <div className="section-header">
              <h2>popular RPGs</h2>
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
                              onClick={() =>
                                handleAddFavorite({
                                  id,
                                })
                              }
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
                            to={`/product/${id}`}
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
        {/* popular nintendo games */}
        <section id="new-arrivals" className="new-arrivals">
          <div className="container">
            <div className="section-header">
              <h2>popular nintendo games</h2>
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
                              onClick={() =>
                                handleAddFavorite({
                                  id,
                                })
                              }
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
                            to={`/product/${id}`}
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
        {/* popular indies */}
        <section id="new-arrivals" className="new-arrivals">
          <div className="container">
            <div className="section-header">
              <h2>popular indies</h2>
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
                              onClick={() =>
                                handleAddFavorite({
                                  id,
                                })
                              }
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
                            to={`/product/${id}`}
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
