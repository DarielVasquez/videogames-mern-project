import express from "express";
import UsersController from "../controllers/users.controller.js";
import verifyToken from "../middleware/token.js";
import checkPassword from "../middleware/checkPassword.js";

const router = express.Router();

router
  .route("/")
  .get(verifyToken, UsersController.apiGetUser)
  .post(UsersController.apiAddUser)
  .patch(verifyToken, checkPassword, UsersController.apiUpdateUser)
  .delete(verifyToken, checkPassword, UsersController.apiRemoveUser);

export default router;
