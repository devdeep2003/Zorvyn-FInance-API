import Router from "express";
import { authenticateUser } from "../middlewares/authenticateUser.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import {
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.post("/create-user", authenticateUser, authorize("users : create"), createUser);
userRouter.patch(
  "/update-user/:id",
  authenticateUser,
  authorize("users : update"),
  updateUser,
);
userRouter.delete(
  "/delete-user/:id",
  authenticateUser,
  authorize("users : delete"),
  deleteUser,
);
export default userRouter;
