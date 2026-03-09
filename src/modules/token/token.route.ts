import { Router } from "express";
import { TokenController } from "./token.controller";

const tokenRouter = Router();
const tokenController = new TokenController();

tokenRouter.post("/create", tokenController.handleCreate);
tokenRouter.post("/update", tokenController.handleUpdate);
tokenRouter.post("/delete", tokenController.handleDelete);
tokenRouter.post("/find", tokenController.handleFind);
tokenRouter.post("/getAll", tokenController.handleList);

export default tokenRouter;
