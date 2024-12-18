import express from "express";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import { userRouter } from "./routes/user.route.js";
import { todosRouter } from "./routes/todos.route.js";
app.use("/api/user", userRouter);
app.use("/api/task", todosRouter);

export { app };
