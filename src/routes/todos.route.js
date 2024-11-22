import { Router } from "express";
import { createTask, updateTask } from "../controller/taskController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const todosRouter = Router();

todosRouter.route("/create-task").post(verifyJWT, createTask);
todosRouter.route("/update-task/:taskId").patch(verifyJWT, updateTask);

export { todosRouter };
