import { Router } from "express";
import { MessageController } from "./messages.controller";

const messageRouter = Router();
const messageController = new MessageController();

messageRouter.post("/create", messageController.handleCreate);
messageRouter.post("/update", messageController.handleUpdate);
messageRouter.post("/delete", messageController.handleDelete);
messageRouter.post("/find", messageController.handleFind);
messageRouter.post("/list", messageController.handleList);

export default messageRouter;
