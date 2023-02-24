import express from "express";
import UsersController from "../controllers/users.controller.js";

const router = express.Router();

router.route("/").get(UsersController.controllerGetUsers);

export default router;
