import connectDB from "../db/index.js";
import userModel from "../models/userModel.model.js";
import bcryptjs from "bcryptjs";

connectDB();
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const isUser = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (isUser) {
      return res.status(401).json({
        success: false,
        message: "username or email already exists",
      });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password:hashedPassword,
      todos:[]
    });
    const createdUser = await userModel.findById(user._id).select("-password");
    if (!createdUser) {
      return res.status("401").json({
        success: false,
        message: "Error Registring user",
      });
    }
    return res.status(201).json({
      success: false,
      message: "User Registered",
      data: createdUser,
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Error",
      error
    });
  }
};

export { registerUser };
