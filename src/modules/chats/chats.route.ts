import { Router } from "express";
import { ChatController } from "./chats.controller";
import { authenticate } from "../../middleware/authenticate";

const chatRouter = Router();
const chatController = new ChatController();

chatRouter.post("/create", chatController.handleCreate);
chatRouter.post("/update", chatController.handleUpdate);
chatRouter.post("/delete", chatController.handleDelete);
chatRouter.post("/find", chatController.handleFind);
chatRouter.post("/list", chatController.handleList);
chatRouter.post(
    "/connection-list",
    chatController.handleConnectionList,
);

export default chatRouter;
