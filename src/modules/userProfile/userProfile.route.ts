import { Router } from "express";
import { UserProfileController } from "./userProfile.controller";
import { authenticate, userAuthenticate } from "../../middleware/authenticate";

const userProfileRouter = Router();
const userProfileController = new UserProfileController();

userProfileRouter.post(
  "/create",
  userProfileController.handleCreate,
);
userProfileRouter.post("/update", userProfileController.handleUpdate);
userProfileRouter.post("/delete", userProfileController.handleDelete);
userProfileRouter.post("/find", userProfileController.handleFind);
userProfileRouter.post("/getAll", userProfileController.handleList);

export default userProfileRouter;
