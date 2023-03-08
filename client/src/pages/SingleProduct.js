import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../actions";
import NoProduct from "./NoProduct";
import Loading from "../components/Loading";
import Alerts from "../components/Alerts";
import { addFavorite } from "../services/favorites";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleProduct = useSelector(
    (state) => state.fetchSingleProduct.singleProduct
  );
  const isLoading = useSelector((state) => state.fetchSingleProduct.isLoading);
  const error = useSelector((state) => state.fetchSingleProduct.error);
  // alerts
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (id) dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  const handleAddFavorite = async ({ id, name, image, description } = {}) => {
    const data = {
      gameId: parseInt(id),
      gameName: name,
      gameImg: image,
      gameDesc: description,
    };
    const request = await addFavorite(data);
    setAlerts((alerts) => [...alerts, request]);
  };

  // alert message

  useEffect(() => {
    const timer = setTimeout(() => {
      if (alerts.length > 0) {
        setAlerts(alerts.slice(1));
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [alerts]);

  const {
    name,
    background_image: image,
    description_raw: description,
    platforms,
    genres,
    metacritic,
    released,
    developers,
    publishers,
    esrb_rating: esrb,
    tags,
  } = singleProduct;

  if (isLoading) {
    return <Loading />;
  } else if (singleProduct.detail === "Not found.") {
    return <NoProduct />;
  } else
    return (
      <main className="single-product-container">
        <Alerts alerts={alerts} setAlerts={setAlerts} />
        <div className="single-product-center">
          <div className="single-product-size">
            <h2 className="single-product-title">{name}</h2>
            <img className="single-product-image" src={image} alt={name} />
            <p className="single-product-desc">{description}</p>
            <p className="margin-bottom">
              <strong>Release Date:</strong> {released}
            </p>
            <ul className="margin-bottom">
              <p className="font-bold">Genres:</p>
              {genres?.map((item) => {
                const { id, name } = item;
                return <li key={id}> - {name}</li>;
              })}
            </ul>
            <ul className="margin-bottom">
              <p className="font-bold">Platforms:</p>
              {platforms?.map((item) => {
                const {
                  platform: { id, name },
                } = item;
                return <li key={id}> - {name}</li>;
              })}
            </ul>
            <div className="margin-bottom">
              <p className="font-bold">Tags:</p>
              {tags?.map((item, index) => {
                const { id, name, language } = item;
                return (
                  <span key={id}>
                    {language === "eng" &&
                      (index === tags.length - 1 ? name : `${name}, `)}
                  </span>
                );
              })}
            </div>
            <p>
              <strong>Metacritic rating: </strong> {metacritic}
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="btn-cart welcome-add-cart center-text add-favorites-btn"
                onClick={() =>
                  handleAddFavorite({
                    id,
                    name,
                    image,
                    description,
                  })
                }
              >
                <span className="lnr lnr-plus-circle"></span>
                add <span>to</span> favorites
              </button>
            </div>
          </div>
        </div>
      </main>
    );
};

export default SingleProduct;
