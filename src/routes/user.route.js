import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/userController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyJWT, logoutUser);

export { userRouter };
