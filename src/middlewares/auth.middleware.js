import userModel from "../models/userModel.model.js";
import jwt from "jsonwebtoken";
const verifyJWT = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Middleware Error Token not found",
      });
    }
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    const user = await userModel.findById(decodedToken._id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Access Token",
      });
    }
    req.user = user;
    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      error:error.message
    });
  }
};
export { verifyJWT };
