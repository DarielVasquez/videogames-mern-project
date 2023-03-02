import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../actions";
import NoProduct from "./NoProduct";
import Loading from "../components/Loading";
import { addFavorite } from "../services/favorites";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleProduct = useSelector(
    (state) => state.fetchSingleProduct.singleProduct
  );
  const isLoading = useSelector((state) => state.fetchSingleProduct.isLoading);
  const error = useSelector((state) => state.fetchSingleProduct.error);
  // console.log(singleProduct);

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
  };

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
      <main style={{ marginTop: "150px", marginBottom: "30px" }}>
        {/* <a
            // href={game.website}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "#007bff",
              fontWeight: "bold",
              marginBottom: "30px",
            }}
          >
            Visit Website
          </a> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              maxWidth: "800px",
              width: "100%",
              padding: "30px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h2
              style={{
                fontSize: "4rem",
                fontWeight: "bold",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              {name}
            </h2>
            <img
              style={{
                display: "block",
                width: "100%",
                minHeight: "400px",
                marginBottom: "20px",
                objectFit: "cover",
              }}
              src={image}
              alt={name}
            />
            <p
              style={{
                maxWidth: "800px",
                width: "100%",
                marginBottom: "20px",
                textTransform: "none",
              }}
            >
              {description}
            </p>
            <p
              style={{
                marginBottom: "20px",
              }}
            >
              <strong>Release Date:</strong> {released}
            </p>
            <ul style={{ marginBottom: "20px" }}>
              <p style={{ fontWeight: "bold" }}>Genres:</p>
              {genres?.map((item) => {
                const { id, name } = item;
                return <li key={id}> - {name}</li>;
              })}
            </ul>
            <ul style={{ marginBottom: "20px" }}>
              <p style={{ fontWeight: "bold" }}>Platforms:</p>
              {platforms?.map((item) => {
                const {
                  platform: { id, name },
                } = item;
                return <li key={id}> - {name}</li>;
              })}
            </ul>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontWeight: "bold" }}>Tags:</p>
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
                className="btn-cart welcome-add-cart"
                style={{ textAlign: "center" }}
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
