import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteFavorite, getFavorites } from "../services/favorites";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  const handleRemoveFavorite = async (game_id) => {
    const removeFavorite = await deleteFavorite(game_id);
    fetchFavorites();
  };

  const fetchFavorites = async () => {
    const favoritesData = await getFavorites();
    setFavorites(favoritesData.favorites);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <main className="container">
      <div
        className="row justify-content-md-center"
        style={{ marginTop: "150px" }}
      >
        <div className="col-sm">
          <table
            className="table table-striped table-bordered table-hover"
            style={{
              backgroundColor: "rgb(248, 249, 252)",
              width: "100%",
              textAlign: "center",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#e99c2e",
                  color: "white",
                }}
              >
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col" className="table-desc">
                  Description
                </th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {favorites?.map((game, index) => {
                const { game_id, game_name, game_img, game_desc, date_added } =
                  game;
                return (
                  <tr style={{ width: "85vw" }} key={game_id}>
                    <th style={{ width: "5%" }}>{index + 1}</th>
                    <td style={{ width: "15%" }}>
                      <img
                        src={game_img}
                        alt={game_name}
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "5px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td style={{ width: "30%" }}>
                      <Link
                        to={`/product/${game_id}`}
                        style={{
                          textAlign: "center",
                          fontSize: "16px",
                          color: "#a09e9c",
                        }}
                      >
                        {game_name}
                      </Link>
                    </td>
                    <td
                      className="table-desc"
                      style={{ width: "40%", textTransform: "none" }}
                    >
                      {game_desc?.length > 250
                        ? `${game_desc?.slice(0, 250)}...`
                        : game_desc}
                    </td>
                    <td style={{ width: "10%" }}>
                      <button
                        onClick={() => handleRemoveFavorite(game_id)}
                        className="btn btn-primary"
                        style={{
                          backgroundColor: "#e99c2e",
                          color: "white",
                          border: "none",
                          fontSize: "16px",
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Favorites;
