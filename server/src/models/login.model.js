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

  static async loginUser({ email, password }) {
    // retrieve the user from the database
    const user = await users.findOne({ email });

    //check if the user exists
    if (user) {
      // compare the entered password with the hashed password in the database
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const payload = {
          _id: user._id,
          password: user.password,
          email: user.email,
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY);
        return {
          userId: user._id,
          token: token,
          status: "success",
          message: "User was authenticated",
        };
      } else {
        return {
          userId: "",
          token: "",
          status: "failure",
          message: "The password is incorrect",
        };
      }
    } else {
      return {
        userId: "",
        token: "",
        status: "failure",
        message: "The email is incorrect",
      };
    }
  }
}
