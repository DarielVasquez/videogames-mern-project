import express from "express";
import LoginController from "../controllers/login.controller.js";

const router = express.Router();

router
  .route("/")
  .get(LoginController.apiGetLog)
  .post(LoginController.apiLoginUser);

router.route("/oauth").post(LoginController.apiOAuth);

export default router;
