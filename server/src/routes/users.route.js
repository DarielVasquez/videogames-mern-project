import express from "express";
import UsersController from "../controllers/users.controller.js";

const router = express.Router();

router
  .route("/")
  //   .get(UsersController.controllerGetUsers)
  .post(UsersController.apiAddUser);

router
  .route("/:id")
  .get(UsersController.apiGetUser)
  .post(UsersController.apiUpdateUser)
  .delete(UsersController.apiRemoveUser);

export default router;
