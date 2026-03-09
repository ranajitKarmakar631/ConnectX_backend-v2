import { Router } from "express";
// import { handleGiminiChat } from "./chatBot.service";
import { handleGeminiChat } from "./chatBot.controller";
// import { ChatBotController } from "../chats/chats.controller";

const chatBotRouter= Router();

chatBotRouter.post('/chat',handleGeminiChat);

export default chatBotRouter;