import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import { CallController } from "./calls.controller";

const callRouter = Router();
const chatController = new CallController();

callRouter.post("/create", chatController.handleCreate);
callRouter.post("/update", chatController.handleUpdate);
callRouter.post("/delete", chatController.handleDelete);
callRouter.post("/find", chatController.handleFind);
callRouter.post("/list", chatController.handleList);

export default callRouter;
