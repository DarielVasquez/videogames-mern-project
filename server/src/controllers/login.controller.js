import LoginModel from "../models/login.model.js";

export default class LoginController {
  static async apiLoginUser(req, res, next) {
    try {
      const { username, password } = req.body;
      const { token, status, message } = await LoginModel.loginUser({
        username,
        password,
      });
      if (status === "success") {
        res.cookie("jwtToken", token, {
          path: "/",
          httpOnly: true,
        });
      }
      let response = {
        status: status,
        message: message,
      };
      res.json(response);
    } catch (e) {
      console.error(`Unable to login user, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetLog(req, res, next) {
    try {
      const token = req.cookies.jwtToken;
      let response;
      if (token) {
        response = {
          status: "success",
          message: "User is verified",
        };
      } else {
        response = {
          status: "failure",
          message: "User isn't authenticated",
        };
      }
      res.json(response);
    } catch (e) {
      console.error(`Unable to get user, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
