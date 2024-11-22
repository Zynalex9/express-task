import { Router } from "express";
import { createTask } from "../controller/taskController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const todosRouter = Router();

todosRouter.route("/create-task").post(verifyJWT, createTask);

export { todosRouter };
