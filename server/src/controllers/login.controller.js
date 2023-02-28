import LoginModel from "../models/login.model.js";

export default class LoginController {
  static async apiLoginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const { userId, token, status, message } = await LoginModel.loginUser({
        email,
        password,
      });
      let response = {
        userId: userId,
        token: token,
        status: status,
        message: message,
      };
      res.json(response);
    } catch (e) {
      console.error(`Unable to login user, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
