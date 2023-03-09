import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchExplore } from "../actions";
import Loading from "../components/Loading";
import Alerts from "../components/Alerts";
import { addFavorite } from "../services/favorites";
import { fetchSingleProduct } from "../actions";
import ExploreDisplay from "../components/ExploreDisplay";

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
  // login toggle
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);

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
    if (isLoggedIn) {
      setClicked(true);
      dispatch(fetchSingleProduct(id));
    }
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
      <main className="container">
        <Alerts alerts={alerts} setAlerts={setAlerts} />
        <div style={{ marginTop: "70px" }}></div>
        {/* popular picks */}
        <ExploreDisplay
          title="Popular Picks"
          products={popularProducts}
          handleAddFavorite={handleAddFavorite}
        />
        <ExploreDisplay
          title="Popular RPGs"
          products={bestProducts}
          handleAddFavorite={handleAddFavorite}
        />
        <ExploreDisplay
          title="Popular Nintendo Games"
          products={actionProducts}
          handleAddFavorite={handleAddFavorite}
        />
        <ExploreDisplay
          title="Popular Indies"
          products={indieProducts}
          handleAddFavorite={handleAddFavorite}
        />
      </main>
    );
};

export default Explore;
