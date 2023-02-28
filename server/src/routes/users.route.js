import express from "express";
import UsersController from "../controllers/users.controller.js";
import verifyToken from "../middleware/token.js";

const router = express.Router();

router
  .route("/")
  .get(verifyToken, UsersController.apiGetUser)
  .post(UsersController.apiAddUser)
  .patch(verifyToken, UsersController.apiUpdateUser)
  .delete(verifyToken, UsersController.apiRemoveUser);

export default router;
