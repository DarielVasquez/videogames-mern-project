import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMainProduct } from "../actions";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const FeaturedMainPage = ({ id }) => {
  const dispatch = useDispatch();
  const mainProduct = useSelector(
    (state) => state.fetchMainProduct.mainProduct
  );
  const isLoading = useSelector((state) => state.fetchMainProduct.isLoading);
  const error = useSelector((state) => state.fetchMainProduct.error);

  useEffect(() => {
    if (id) dispatch(fetchMainProduct(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <Loading />;
  } else
    return (
      <section
        id="sofa-collection"
        className="sofa-collection"
        style={{ zIndex: "0" }}
      >
        <div
          className="owl-carousel owl-theme"
          id="collection-carousel"
          style={{ display: "block" }}
        >
          <div
            className="sofa-collection collectionbg1"
            style={{
              backgroundImage: `url(${mainProduct.background_image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="container">
              <div className="sofa-collection-txt">
                <h2>{mainProduct.name}</h2>
                <p style={{ textTransform: "none" }}>
                  {mainProduct.description_raw?.length > 300
                    ? `${mainProduct.description_raw
                        ?.substring(0, 300)
                        .trim()}...`
                    : mainProduct.description_raw}
                </p>
                <Link
                  className="btn-cart welcome-add-cart sofa-collection-btn text-center"
                  to={`product/${id}`}
                >
                  view more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default FeaturedMainPage;
