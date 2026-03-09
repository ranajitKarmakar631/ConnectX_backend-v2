import type { Application } from "express";
import userRouter from "./users/user.route";
import chatRouter from "./chats/chats.route";
import messageRouter from "./messages/messages.route";
import tokenRouter from "./token/token.route";
import userProfileRouter from "./userProfile/userProfile.route";
import { callModel } from "./calls/calls.model";
import callRouter from "./calls/calls.route";
import chatBotRouter from "./chatBot/chatBot.router";
import redisRouter from "./redis/redis.router";
// import { roomRouter } from "./Rooms/room.router";

export default function initializeModules(app: Application): void {
  app.use("/api/users", userRouter);
  app.use("/api/chats", chatRouter);
  app.use("/api/messages", messageRouter);
  app.use("/api/token", tokenRouter);
  app.use("/api/user-profile", userProfileRouter);
  app.use("/api/calls", callRouter);
  app.use("/api/redis", redisRouter);
  // app.use("/api/gemini", chatBotRouter);
}
