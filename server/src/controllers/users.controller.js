import UsersModel from "../models/users.model.js";

export default class UsersController {
  static async apiGetUser(req, res, next) {
    try {
      const userId = req.params.id;
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
      const name = req.body.name;
      const username = req.body.username;
      const password = req.body.password;
      const email = req.body.email;
      const date = new Date();
      const { status, message } = await UsersModel.addUser({
        name,
        username,
        password,
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
      const userId = req.params.id;
      const name = req.body.name;
      const username = req.body.username;
      const password = req.body.password;
      const email = req.body.email;
      const { status, message } = await UsersModel.updateUser({
        userId,
        name,
        username,
        password,
        email,
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

  static async apiRemoveUser(req, res, next) {
    try {
      const userId = req.params.id;
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
