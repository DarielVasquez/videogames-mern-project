import { ObjectId } from "mongodb";
let users;

export default class UsersModel {
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

  static async getUser({ userId } = {}) {
    try {
      const user = await users.findOne({ _id: ObjectId(userId) });
      return {
        user: user,
        status: "success",
        message: `Found existing user`,
      };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return {
        user: {},
        status: "failure",
        message: `Unable to issue find command, ${e}`,
      };
    }
  }

  static async addUser({ name, username, password, email, date }) {
    try {
      // Check if username is already used
      const existingUserByUsername = await users.findOne({ username });
      if (existingUserByUsername) {
        return { status: "failure", message: "Username is already in use" };
      }

      // Check if email is already used
      const existingUserByEmail = await users.findOne({ email });
      if (existingUserByEmail) {
        return { status: "failure", message: "Email is already in use" };
      }

      const result = await users.insertOne({
        name: name,
        username: username,
        password: password,
        email: email,
        date_created: date,
        favorites: [],
      });
      return { status: "success", message: "User was created" };
    } catch (e) {
      return { status: "failure", message: `Unable to add new user, ${e}` };
    }
  }

  static async updateUser({ userId, name, username, password, email }) {
    try {
      const user = await users.findOne({ _id: ObjectId(userId) });

      if (!user) {
        return { status: "failure", message: "User doesn't exist" };
      }

      // Check if username is already used
      const existingUserByUsername = await users.findOne({
        username,
        _id: { $ne: ObjectId(userId) },
      });
      if (existingUserByUsername) {
        return { status: "failure", message: "Username is already in use" };
      }

      // Check if email is already used
      const existingUserByEmail = await users.findOne({
        email,
        _id: { $ne: ObjectId(userId) },
      });
      if (existingUserByEmail) {
        return { status: "failure", message: "Email is already in use" };
      }

      const result = await users.findOneAndUpdate(
        { _id: ObjectId(userId) },
        {
          $set: {
            name: name,
            username: username,
            password: password,
            email: email,
          },
        }
      );
      return { status: "success", message: "User was updated" };
    } catch (e) {
      return { status: "failure", message: `Unable to add new user, ${e}` };
    }
  }

  static async removeUser({ userId }) {
    try {
      const user = await users.findOne({ _id: ObjectId(userId) });

      if (!user) {
        return { status: "failure", message: "User doesn't exist" };
      }

      const result = await users.findOneAndDelete({ _id: ObjectId(userId) });
      return { status: "success", message: "User was deleted" };
    } catch (e) {
      return { status: "failure", message: `Unable to remove user, ${e}` };
    }
  }
}
