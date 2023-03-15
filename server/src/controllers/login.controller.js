import LoginModel from "../models/login.model.js";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

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
          maxAge: 365 * 24 * 60 * 60 * 1000, // a year
          path: "/",
          secure: true,
          sameSite: "none",
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
      let response;
      const token = req.cookies.jwtToken;
      if (token) {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (decoded.password) {
          response = {
            isOAuth: false,
            status: "success",
            message: "User is verified",
          };
        } else {
          response = {
            isOAuth: true,
            status: "success",
            message: "User is verified",
          };
        }
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

  static async apiOAuth(req, res, next) {
    try {
      const { clientId, credential } = req.body;
      const date = new Date();
      try {
        const client = new OAuth2Client(clientId);
        const ticket = await client.verifyIdToken({
          idToken: credential,
          audience: clientId,
        });
        const payload = ticket.getPayload();
        const data = {
          name: `${payload.given_name} ${payload.family_name}`,
          username: payload.name,
          email: payload.email,
          picture: payload.picture,
        };
        const { token, status, message } = await LoginModel.loginOAuth({
          data,
          date,
        });
        if (status === "success") {
          res.cookie("jwtToken", token, {
            maxAge: 365 * 24 * 60 * 60 * 1000, // a year
            path: "/",
            secure: true,
            sameSite: "none",
            httpOnly: true,
          });
        }
        let response = {
          status: status,
          message: message,
        };
        res.json(response);
      } catch (e) {
        console.error("Error verifying Google token:", e);
        return null;
      }
    } catch (e) {
      console.error(`Unable to login user with OAuth, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
