import express from "express";
import FavoritesController from "../controllers/favorites.controller.js";
import verifyToken from "../middleware/token.js";

const router = express.Router();

router
  .route("/")
  .get(verifyToken, FavoritesController.apiGetFavorites)
  .post(verifyToken, FavoritesController.apiAddFavorite)
  .delete(FavoritesController.apiRemoveFavorite);

export default router;
