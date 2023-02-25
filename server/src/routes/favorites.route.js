import express from "express";
import FavoritesController from "../controllers/favorites.controller.js";

const router = express.Router();

router
  .route("/:id")
  .get(FavoritesController.apiGetFavorites)
  .post(FavoritesController.apiAddFavorite)
  .delete(FavoritesController.apiRemoveFavorite);

export default router;
