export default class LogoutController {
  static async apiLogoutUser(req, res, next) {
    try {
      const token = req.cookies.jwtToken;
      let response;
      if (token) {
        res.clearCookie("jwtToken", { sameSite: "none", secure: true });
        response = {
          status: "success",
          message: "Logged out user",
        };
      }
      res.json(response);
    } catch (e) {
      console.error(`Unable to logout user, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
