import FavoritesModel from "../models/favorites.model.js";

export default class FavoritesController {
  static async getFavoritesController(req, res, next) {
    const userId = req.body.id;
    try {
      const { favoritesList, totalNumFavorites } =
        await FavoritesModel.getFavorites({ userId });
      res.json({
        favorites: favoritesList,
        totalNumFavorites,
      });
    } catch (e) {
      console.error(`Unable to get user games, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async postFavoriteController(req, res, next) {
    try {
      const userId = req.params.id;
      const gameId = req.body.id;
      if (!gameId) {
        res.status(400).json({ error: "Game ID required" });
        return;
      }
      const userGameResponse = await FavoritesModel.postFavorite(
        userId,
        gameId
      );
      const { userGame } = userGameResponse;
      res.json({ status: "success", userGame });
    } catch (e) {
      console.error(`Unable to add user game, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
