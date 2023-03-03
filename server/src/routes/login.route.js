import express from "express";
import LoginController from "../controllers/login.controller.js";

const router = express.Router();

router
  .route("/")
  .get(LoginController.apiGetLog)
  .post(LoginController.apiLoginUser);

export default router;
