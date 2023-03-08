import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../actions";
import FeaturedMainPage from "../components/FeaturedMainPage";
import Loading from "../components/Loading";
import Alerts from "../components/Alerts";
import { addFavorite } from "../services/favorites";
import { fetchSingleProduct } from "../actions";

const Home = () => {
  const dispatch = useDispatch();

  // all products
  const allPopularProducts = useSelector(
    (state) => state.fetchProducts.popularProducts
  );
  const allLatestProducts = useSelector(
    (state) => state.fetchProducts.latestProducts
  );
  const allFeaturedProducts = useSelector(
    (state) => state.fetchProducts.featuredProducts
  );
  const isLoading = useSelector((state) => state.fetchProducts.isLoading);
  // alerts
  const [alerts, setAlerts] = useState([]);

  // fetch data

  useEffect(() => {
    dispatch(fetchProducts());
  }, [fetchProducts]);

  const popularProducts = allPopularProducts.results;
  const latestProducts = allLatestProducts.results;
  const featuredProducts = allFeaturedProducts.results;
  const featuredSingleProductId = allLatestProducts.results?.[0].id;

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
        <header id="home" className="welcome-hero white-background">
          <div
            id="header-carousel"
            className="carousel slide carousel-fade"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              {popularProducts?.slice(0, 4).map((item, index) => {
                const { id } = item;
                return (
                  <li
                    key={id}
                    data-target="#header-carousel"
                    data-slide-to={index}
                    className={index === 0 ? "active" : ""}
                  >
                    <span className="small-circle"></span>
                  </li>
                );
              })}
            </ol>

            {/* home page */}
            <div className="carousel-inner" role="listbox">
              {latestProducts?.slice(0, 4).map((product, index) => {
                const {
                  id,
                  name,
                  background_image,
                  price,
                  description,
                  platforms,
                } = product;
                return (
                  <div key={id} className={`item ${index === 0 && "active"}`}>
                    <div className={`single-slide-item slide${index}`}>
                      <div className="container">
                        <div className="welcome-hero-content">
                          <div className="row">
                            <div className="col-sm-7">
                              <div className="single-welcome-hero">
                                <div className="welcome-hero-txt">
                                  <h4>latest releases</h4>
                                  <h2>
                                    {name.length > 50
                                      ? `${name.substring(0, 50).trim()}...`
                                      : name}
                                  </h2>
                                  <div>
                                    Available on these platforms:
                                    <ul>
                                      {platforms.map(({ platform }) => {
                                        const { id, name } = platform;
                                        return <li key={id}>- {name} </li>;
                                      })}
                                    </ul>
                                  </div>
                                  <button
                                    className="btn-cart welcome-add-cart center-text"
                                    onClick={() =>
                                      handleAddFavorite({
                                        id,
                                      })
                                    }
                                  >
                                    <span className="lnr lnr-plus-circle"></span>
                                    add <span>to</span> favorites
                                  </button>
                                  <Link
                                    className="btn-cart welcome-add-cart welcome-more-info center-text"
                                    to={`product/${id}`}
                                  >
                                    More info
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-5">
                              <div className="single-welcome-hero">
                                <div className="welcome-hero-img">
                                  <img
                                    src={background_image}
                                    alt={name}
                                    className="home-image"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </header>

        {/* popular products */}
        <section id="populer-products" className="populer-products">
          <div className="container">
            <div className="populer-products-content">
              <div className="row">
                {latestProducts?.slice(4, 8).map((product) => {
                  const { id, name, background_image, price, description } =
                    product;
                  return (
                    <div key={id} className="col-md-3">
                      <div className="single-populer-products">
                        <div className="single-populer-product-img mt20">
                          <img
                            src={background_image}
                            alt={name}
                            className="popular-product-img"
                          />
                        </div>
                        <h2>
                          <Link
                            to={`product/${id}`}
                            className="popular-product-title"
                          >
                            {name}
                          </Link>
                        </h2>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* highest rated */}
        <section id="new-arrivals" className="new-arrivals">
          <div className="container">
            <div className="section-header">
              <h2>highest rated</h2>
            </div>
            <div className="new-arrivals-content">
              <div className="row">
                {popularProducts?.slice(0, 8).map((product) => {
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

        {/* featured product main page */}
        <FeaturedMainPage id={featuredSingleProductId} />

        {/* featured products */}
        <section id="feature" className="feature white-background">
          <div className="container">
            <div className="section-header">
              <h2>featured products</h2>
            </div>
            <div className="feature-content">
              <div className="row">
                {featuredProducts?.slice(0, 4).map((product) => {
                  const { id, name, background_image, ratings_count } = product;
                  return (
                    <div key={id} className="col-sm-3">
                      <div className="single-feature">
                        <img
                          src={background_image}
                          alt={name}
                          className="single-product-img"
                        />
                        <div className="single-feature-txt text-center">
                          <p>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <span className="spacial-feature-icon">
                              <i className="fa fa-star"></i>
                            </span>
                            <span className="feature-review">
                              ({ratings_count})
                            </span>
                          </p>
                          <h3>
                            <Link
                              to={`product/${id}`}
                              className="popular-product-title"
                            >
                              {name.length > 50
                                ? `${name.substring(0, 50).trim()}...`
                                : name}
                            </Link>
                          </h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* <section id="clients" className="clients">
        <div className="container">
          <div className="owl-carousel owl-theme" id="client" style={{display: 'block'}}>
            <div className="item">
              <a href="#">
                <img src="assets/images/clients/c1.png" alt="brand-image" />
              </a>
            </div>
            <div className="item">
              <a href="#">
                <img src="assets/images/clients/c2.png" alt="brand-image" />
              </a>
            </div>
            <div className="item">
              <a href="#">
                <img src="assets/images/clients/c3.png" alt="brand-image" />
              </a>
            </div>
            <div className="item">
              <a href="#">
                <img src="assets/images/clients/c4.png" alt="brand-image" />
              </a>
            </div>
            <div className="item">
              <a href="#">
                <img src="assets/images/clients/c5.png" alt="brand-image" />
              </a>
            </div>
          </div>
        </div>
      </section> */}
      </main>
    );
};

export default Home;
