import { Router } from "express";
import { UserController } from "./user.controller";
import { authenticate } from "../../middleware/authenticate";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/register", userController.handleCreate);
userRouter.post("/update", userController.handleUpdate);
userRouter.post("/delete", userController.handleDelete);
userRouter.post("/find", userController.handleFind);
userRouter.post("/list", userController.handleList);
userRouter.post("/logout", authenticate, userController.handleLogout);
userRouter.post("/login", userController.handleLogin);

export default userRouter;
