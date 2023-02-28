import FavoritesModel from "../models/favorites.model.js";

export default class FavoritesController {
  static async apiGetFavorites(req, res, next) {
    const userId = req.cookies.userId;
    try {
      const { favoritesList, totalNumFavorites } =
        await FavoritesModel.getFavoritesById({ userId });
      res.json({
        favorites: favoritesList,
        totalNumFavorites,
      });
    } catch (e) {
      console.error(`Unable to get user games, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiAddFavorite(req, res, next) {
    try {
      const userId = req.cookies.userId;
      const gameId = req.body.gameId;
      const gameName = req.body.gameName;
      const gameImg = req.body.gameImg;
      const gameDesc = req.body.gameDesc;
      const dateAdded = new Date();
      if (!gameId) {
        res.status(400).json({ error: "Game ID required" });
        return;
      }
      const { status, message } = await FavoritesModel.addFavorite({
        userId,
        gameId,
        gameName,
        gameImg,
        gameDesc,
        dateAdded,
      });
      let response = {
        status: status,
        message: message,
      };
      res.json(response);
    } catch (e) {
      console.error(`Unable to add user game, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiRemoveFavorite(req, res, next) {
    try {
      const userId = req.cookies.userId;
      const gameId = req.body.gameId;
      if (!gameId) {
        res.status(400).json({ error: "Game ID required" });
        return;
      }
      if (!userId) {
        res.status(400).json({ error: "User ID required" });
        return;
      }
      const { status, message } = await FavoritesModel.removeFavorite({
        userId,
        gameId,
      });
      let response = {
        status: status,
        message: message,
      };
      res.json(response);
    } catch (e) {
      console.error(`Unable to remove user game, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
