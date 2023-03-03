import bcrypt from "bcrypt";
import UsersModel from "../models/users.model.js";

export default class UsersController {
  static async apiGetUser(req, res, next) {
    try {
      const userId = req.user._id;
      const { user, status, message } = await UsersModel.getUser({
        userId,
      });
      let response = {
        user: user,
        status: status,
        message: message,
      };
      res.json(response);
    } catch (e) {
      console.error(`Unable to get user, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiAddUser(req, res, next) {
    try {
      const { name, username, password, email } = req.body;
      const date = new Date();
      //password encryption
      const hashedPassword = await bcrypt.hash(password, 10);
      const { status, message } = await UsersModel.addUser({
        name,
        username,
        password: hashedPassword,
        email,
        date,
      });
      let response = {
        status: status,
        message: message,
      };
      res.json(response);
    } catch (e) {
      console.error(`Unable to add user, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiUpdateUser(req, res, next) {
    try {
      const userId = req.user._id;
      const { name, username, password, confirmPassword, email } = req.body;
      //password encryption
      const hashedPassword = password
        ? await bcrypt.hash(password, 10)
        : await bcrypt.hash(confirmPassword, 10);
      const { status, message } = await UsersModel.updateUser({
        userId,
        name,
        username,
        password: hashedPassword,
        email,
      });
      let response = {
        status: status,
        message: message,
      };
      res.json(response);
    } catch (e) {
      console.error(`Unable to update user, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiRemoveUser(req, res, next) {
    try {
      const userId = req.user._id;
      const { status, message } = await UsersModel.removeUser({
        userId,
      });
      let response = {
        status: status,
        message: message,
      };
      res.json(response);
    } catch (e) {
      console.error(`Unable to remove user, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
