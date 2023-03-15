import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
let users;

export default class LoginModel {
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

  static async loginUser({ username, password }) {
    // retrieve the user from the database
    const user = await users.findOne({ username });

    //check if the user exists
    if (user) {
      // compare the entered password with the hashed password in the database
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const payload = {
          _id: user._id,
          password: user.password,
          username: user.username,
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY);
        return {
          token: token,
          status: "success",
          message: "User was authenticated",
        };
      } else {
        return {
          token: "",
          status: "failure",
          message: "The password is incorrect",
        };
      }
    } else {
      return {
        token: "",
        status: "failure",
        message: "The username is incorrect",
      };
    }
  }

  static async loginOAuth({ data, date }) {
    let _id;
    const { name, username, email, picture } = data;
    // retrieve the user from the database
    const user = await users.findOne({ username });
    //check if the user exists
    if (!user) {
      const result = await users.insertOne({
        name: name,
        username: username,
        email: email,
        picture: picture,
        date_created: date,
        favorites: [],
      });
      _id = result.insertedId;
    }
    const payload = {
      _id: user ? user._id : _id,
      username,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    return {
      token: token,
      status: "success",
      message: "The user has been authenticated",
    };
  }
}
