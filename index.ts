import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from "cors";
// import * as dotenv from "dotenv";
import initializeModules from "./src/modules/main.route";
import * as mongooseConfig from "./src/config/mongooseConfig";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";
import { registerSocketHandlers } from "./src/socket/socketServer";
import { connectRedis } from "./src/modules/redis/redisServer";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow all origins
      callback(null, true);
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("🚀 TypeScript Mongo Backend Running");
});

initializeModules(app);
connectRedis();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
  },
});

registerSocketHandlers(io);

const PORT = process.env.PORT || 4000;

mongooseConfig.connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
