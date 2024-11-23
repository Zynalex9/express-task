import { Router } from "express";
import { createTask, updateTask,toggleTaskCompletion } from "../controller/taskController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const todosRouter = Router();

todosRouter.route("/create-task").post(verifyJWT, createTask);
todosRouter.route("/update-task/:taskId").patch(verifyJWT, updateTask);
todosRouter.route("/toggle-task/:taskId").post(verifyJWT,toggleTaskCompletion)

export { todosRouter };
