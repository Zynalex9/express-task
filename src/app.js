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
app.get("/api/jokes", (req, res) => {
  const jokes = [
    { title: "hello 1", desc: "mellow 1" },
    { title: "hello 2", desc: "mellow 2" },
    { title: "hello 3", desc: "mellow 3" },
  ];
  res.send(jokes);
});
export { app };
