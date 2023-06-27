import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteFavorite, getFavorites } from "../services/favorites";
import Loading from "../components/Loading";
import Alerts from "../components/Alerts";
import { isUserLogged } from "../services/login";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { updateFavorites } from "../services/favorites";

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [favoritesPerPage, setFavoritesPerPage] = useState(5);
  // search query
  const [search, setSearch] = useState("");
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  // alerts
  const [alerts, setAlerts] = useState([]);
  const values = [5, 10, 15, 20, 25, 50, 100];

  // remove favorite

  const handleRemoveFavorite = async (game_id) => {
    const request = await deleteFavorite(game_id);
    fetchFavorites();
    setSearch("");
    if (indexOfFirstFavorite + 1 === totalFavorites) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
    setAlerts((alerts) => [...alerts, request]);
  };

  // fetch favorites

  const fetchFavorites = async () => {
    const favoritesData = await getFavorites(currentPage, favoritesPerPage);
    setFavorites(favoritesData.favorites);
    setFilteredFavorites(favoritesData.favorites);
    setIsLoading(false);
  };

  // verify user

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
    const data = JSON.parse(localStorage.getItem("favoritesPerPage"));
    if (data) {
      setFavoritesPerPage(data);
    }
  }, []);

  // sortable table

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;
    const items = Array.from(favorites);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFavorites(items);
    setFilteredFavorites(items);
    const update = await updateFavorites({ favorites: items });
  };

  // pagination

  const indexOfLastFavorite = currentPage * favoritesPerPage;
  const indexOfFirstFavorite = indexOfLastFavorite - favoritesPerPage;
  const totalFavorites = filteredFavorites.length;

  // limit favorites per page

  const handleLimitChange = (event) => {
    setCurrentPage(1);
    localStorage.setItem("favoritesPerPage", Number(event.target.value));
    setFavoritesPerPage(Number(event.target.value));
  };

  // search input

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    const filtered = favorites.filter((favorite) =>
      favorite.game_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredFavorites(filtered);
    setCurrentPage(1);
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

  const totalSearch = search.length;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <main className="container">
      <h2 className="title" style={{ marginTop: "140px" }}>
        Favorites
      </h2>
      <Alerts alerts={alerts} setAlerts={setAlerts} />
      {favorites?.length === 0 ? (
        <div className="center-text">no favorites added</div>
      ) : (
        <>
          <div className="data-table">
            <div className="input-group mb-3">
              {`Show `}
              <select
                className="form-select"
                name="limit"
                id="limit"
                value={favoritesPerPage}
                onChange={handleLimitChange}
              >
                {values.map((val, i) => {
                  return (
                    <option
                      className={i === 0 ? "dropdown-item" : ""}
                      key={i}
                      value={val}
                    >
                      {val}
                    </option>
                  );
                })}
              </select>
              {` entries`}
            </div>
            <div>
              <input
                type="text"
                className={`input-form `}
                id="name"
                name="name"
                value={search}
                placeholder="Search..."
                onChange={handleSearch}
              />
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
                    <table className="table table-striped table-bordered table-hover">
                      <thead>
                        <tr className="tr">
                          <th
                            scope="col"
                            style={{ display: totalSearch > 0 && "none" }}
                          ></th>
                          <th scope="col">#</th>
                          <th scope="col">Image</th>
                          <th scope="col" className="table-title">
                            Name
                          </th>
                          <th scope="col" className="table-desc">
                            Description
                          </th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredFavorites.length === 0 ? (
                          <tr>
                            <td colSpan="6">no results found</td>
                          </tr>
                        ) : (
                          filteredFavorites
                            .slice(indexOfFirstFavorite, indexOfLastFavorite)
                            .map((game, index) => {
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
                                  isDragDisabled={totalSearch > 0}
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
                                        style={{
                                          width: "5%",
                                          display: totalSearch > 0 && "none",
                                        }}
                                        {...provided.dragHandleProps}
                                      >
                                        <span
                                          className={`lnr lnr-menu`}
                                          style={{
                                            cursor:
                                              totalSearch > 0 && "no-drop",
                                          }}
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
                                          className="img-table"
                                        />
                                      </td>
                                      <td className="table-title">
                                        <Link
                                          to={`/product/${game_id}`}
                                          className="title-link"
                                        >
                                          {game_name}
                                        </Link>
                                      </td>
                                      <td className="table-desc">
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
                                          style={{ fontSize: "16px" }}
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
                            })
                        )}
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
              {`Showing ${
                totalFavorites > 0 ? indexOfFirstFavorite + 1 : 0
              } to ${
                indexOfLastFavorite > totalFavorites
                  ? totalFavorites
                  : indexOfLastFavorite
              } of ${favorites.length} entries`}
            </p>
            {favoritesPerPage >= totalFavorites ? null : (
              <ul className="pagination">
                {Array.from(
                  {
                    length: Math.ceil(totalFavorites / favoritesPerPage),
                  },
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
