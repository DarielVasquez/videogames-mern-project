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

  static async getFavorites({ userId } = {}) {
    let cursor;
    try {
      cursor = await users.findOne({ _id: ObjectId(userId) });
      console.log(cursor.favorites);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { favoritesList: [], totalNumFavorites: 0 };
    }
    try {
      const favoritesList = await cursor.favorites;
      const totalNumFavorites = await cursor.favorites.length;
      return { favoritesList, totalNumFavorites };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { favoritesList: [], totalNumFavorites: 0 };
    }
  }

  static async postFavorite(userId, videoGameId) {
    try {
      const result = await favorites.updateOne(
        { _id: ObjectId(userId) },
        { $addToSet: { favorites: { game_id: ObjectId(videoGameId) } } }
      );
      return result.modifiedCount === 1;
    } catch (e) {
      console.error(`Unable to add favorite video game, ${e}`);
      return false;
    }
  }
}
