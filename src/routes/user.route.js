import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/userController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAuthenticated } from "../middlewares/checkAuth.middleware.js";
const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/check-auth").get(isAuthenticated, (_, res) => {
  res.status(201).json({ isAuthenticated: true });
});
export { userRouter };
