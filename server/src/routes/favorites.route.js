import express from "express";
import FavoritesController from "../controllers/favorites.controller.js";

const router = express.Router();

router
  .route("/")
  .get(FavoritesController.getFavoritesController)
  .post(FavoritesController.postFavoriteController);

export default router;
