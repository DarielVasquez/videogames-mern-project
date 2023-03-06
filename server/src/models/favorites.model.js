import { ObjectId } from "mongodb";
let users;

export default class FavoritesModel {
  static async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn.db(process.env.ATLAS_NS).collection("users");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in users model: ${e}`
      );
    }
  }

  static async getFavoritesById({ userId } = {}) {
    let cursor;
    try {
      cursor = await users.findOne({ _id: ObjectId(userId) });
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { favoritesList: [], totalNumFavorites: 0 };
    }
    try {
      const favoritesList = (await cursor?.favorites) || [];
      const totalNumFavorites = (await cursor?.favorites.length) || 0;
      return { favoritesList, totalNumFavorites };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { favoritesList: [], totalNumFavorites: 0 };
    }
  }

  static async addFavorite({
    userId,
    gameId,
    gameName,
    gameImg,
    gameDesc,
    dateAdded,
  }) {
    try {
      const user = await users.findOne({ _id: ObjectId(userId) });

      //check if the game has already been added to favorites
      if (user.favorites.some((i) => i.game_id === gameId)) {
        return {
          status: "failure",
          message: "Game is already in user favorites",
        };
      } else {
        const result = await users.updateOne(
          { _id: ObjectId(userId) },
          {
            $addToSet: {
              favorites: {
                game_id: gameId,
                game_name: gameName,
                game_img: gameImg,
                game_desc: gameDesc,
                date_added: dateAdded,
              },
            },
          }
        );
        return {
          status: "success",
          message: "Game has been added to favorites",
        };
      }
    } catch (e) {
      console.error(`Unable to add favorite video game, ${e}`);
      return false;
    }
  }

  static async updateFavorites({ userId, favorites }) {
    try {
      const user = await users.findOneAndUpdate(
        { _id: ObjectId(userId) },
        { $set: { favorites: favorites } }
      );
      return {
        status: "success",
        message: "User's favorites has been updated",
      };
    } catch (e) {
      console.error(`Unable to update favorites list, ${e}`);
      return {
        status: "failure",
        message: `Unable to update favorites list, ${e}`,
      };
    }
  }

  static async removeFavorite({ userId, gameId }) {
    try {
      const user = await users.findOneAndUpdate(
        { _id: ObjectId(userId) },
        { $pull: { favorites: { game_id: gameId } } }
      );
      return {
        status: "success",
        message: "Game has been removed from favorites",
      };
    } catch (e) {
      console.error(`Unable to remove favorite game, ${e}`);
      return {
        status: "failure",
        message: `Unable to remove favorite game, ${e}`,
      };
    }
  }
}
