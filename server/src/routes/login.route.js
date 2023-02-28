import express from "express";
import LoginController from "../controllers/login.controller.js";

const router = express.Router();

router.route("/").post(LoginController.apiLoginUser);

export default router;
