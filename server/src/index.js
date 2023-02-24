import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import UsersModel from "./models/users.model.js";
import FavoritesModel from "./models/favorites.model.js";
dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.ATLAS_DB_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await UsersModel.injectDB(client);
    await FavoritesModel.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
