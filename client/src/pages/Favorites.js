import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteFavorite, getFavorites } from "../services/favorites";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { isUserLogged } from "../services/login";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { updateFavorites } from "../services/favorites";

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [favoritesPerPage, setFavoritesPerPage] = useState(5);
  const [totalFavorites, setTotalFavorites] = useState(0);

  // remove favorite

  const handleRemoveFavorite = async (game_id) => {
    const removeFavorite = await deleteFavorite(game_id);
    fetchFavorites();
  };

  // fetch favorites

  const fetchFavorites = async () => {
    const favoritesData = await getFavorites(currentPage, favoritesPerPage);
    setFavorites(favoritesData.favorites);
    setTotalFavorites(favoritesData.totalNumFavorites);
    setIsLoading(false);
  };

  const verifyUser = async () => {
    const user = await isUserLogged();
    if (user.status === "success") {
      fetchFavorites();
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  // sortable table

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;
    const items = Array.from(favorites);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFavorites(items);
    const update = await updateFavorites({ favorites: items });
  };

  // pagination

  const indexOfLastFavorite = currentPage * favoritesPerPage;
  const indexOfFirstFavorite = indexOfLastFavorite - favoritesPerPage;
  const currentFavorites = favorites?.slice(
    indexOfFirstFavorite,
    indexOfLastFavorite
  );

  // limit favorites per page

  const handleLimitChange = (event) => {
    setCurrentPage(1);
    setFavoritesPerPage(Number(event.target.value));
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <main className="container">
      <h2
        className="title"
        style={{
          marginTop: "140px",
        }}
      >
        Favorites
      </h2>
      {favorites?.length === 0 ? (
        <div style={{ textAlign: "center" }}>no favorites added</div>
      ) : (
        <>
          <div style={{ display: "flex", margin: "15px" }}>
            <div className="input-group mb-3">
              {`Show `}
              <select
                className="form-select"
                name="limit"
                id="limit"
                value={favoritesPerPage}
                onChange={handleLimitChange}
              >
                <option className="dropdown-item" value={5}>
                  5
                </option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              {` entries`}
            </div>
          </div>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="row justify-content-md-center">
              <Droppable droppableId="items">
                {(provided) => (
                  <div
                    className="col-sm"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
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
                          <th scope="col"></th>
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
                        {currentFavorites?.map((game, index) => {
                          const {
                            game_id,
                            game_name,
                            game_img,
                            game_desc,
                            date_added,
                          } = game;
                          return (
                            <Draggable
                              key={game_id}
                              draggableId={game_id.toString()}
                              index={
                                index + favoritesPerPage * (currentPage - 1)
                              }
                            >
                              {(provided) => (
                                <tr
                                  style={{ width: "85vw" }}
                                  {...provided.draggableProps}
                                  ref={provided.innerRef}
                                >
                                  <th
                                    style={{ width: "5%" }}
                                    {...provided.dragHandleProps}
                                  >
                                    <span
                                      className="lnr lnr-menu"
                                      {...provided.dragHandleProps}
                                    ></span>
                                  </th>
                                  <td style={{ width: "5%" }}>
                                    {index +
                                      favoritesPerPage * (currentPage - 1) +
                                      1}
                                  </td>
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
                                    style={{
                                      width: "40%",
                                      textTransform: "none",
                                    }}
                                  >
                                    {game_desc?.length > 250
                                      ? `${game_desc?.slice(0, 250)}...`
                                      : game_desc}
                                  </td>
                                  <td style={{ width: "5%" }}>
                                    <button
                                      onClick={() =>
                                        handleRemoveFavorite(game_id)
                                      }
                                      className="btn btn-danger"
                                      style={{
                                        fontSize: "16px",
                                      }}
                                    >
                                      <span
                                        className="lnr lnr-trash"
                                        style={{ cursor: "pointer" }}
                                      ></span>
                                    </button>
                                  </td>
                                </tr>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </tbody>
                    </table>
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
          <nav className="pagination-nav">
            <p style={{ textTransform: "none" }}>
              {`Showing ${indexOfFirstFavorite + 1} to ${
                indexOfLastFavorite > totalFavorites
                  ? totalFavorites
                  : indexOfLastFavorite
              } of ${totalFavorites} entries`}
            </p>
            {favoritesPerPage >= totalFavorites ? null : (
              <ul className="pagination" style={{ marginTop: "0" }}>
                {Array.from(
                  { length: Math.ceil(totalFavorites / favoritesPerPage) },
                  (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      <span className="page-link">{i + 1}</span>
                    </li>
                  )
                )}
              </ul>
            )}
          </nav>
        </>
      )}
    </main>
  );
};

export default Favorites;
