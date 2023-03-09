import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ExploreDisplay = ({ title, products, handleAddFavorite }) => {
  // login toggle
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);
  return (
    <section id="new-arrivals" className="new-arrivals">
      <div className="container">
        <div className="section-header">
          <h2>{title}</h2>
        </div>
        <div className="new-arrivals-content">
          <div className="row">
            {products?.slice(0, 12).map((product) => {
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
                      {isLoggedIn && (
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
                      )}
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
  );
};

export default ExploreDisplay;
