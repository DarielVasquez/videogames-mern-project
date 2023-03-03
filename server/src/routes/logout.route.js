import express from "express";
import LogoutController from "../controllers/logout.controller.js";
import verifyToken from "../middleware/token.js";

const router = express.Router();

router.route("/").get(verifyToken, LogoutController.apiLogoutUser);

export default router;
