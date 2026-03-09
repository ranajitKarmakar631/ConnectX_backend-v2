import { Router } from "express";
import { RedisController } from "./redis.controller";


const redisRouter= Router()

const redisController= new RedisController();

redisRouter.post('/isOnline',redisController.handleGetUserOnline);

// redisRouter.post('/last-message', redisController.handleGetLastMessage);

export default redisRouter