import connectDB from "../db/index.js";
import userModel from "../models/userModel.model.js";
import bcryptjs from "bcryptjs";

connectDB();
const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token",
    );
  }
};
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
      password: hashedPassword,
      todos: [],
    });
    const createdUser = await userModel.findById(user._id).select("-password");
    if (!createdUser) {
      return res.status("401").json({
        success: false,
        message: "Error Registring user",
      });
    }
    return res.status(201).json({
      success: true,
      message: "User Registered",
      data: createdUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error",
      error,
    });
  }
};
const loginUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username && !email) {
      return res.status(401).json({
        success: false,
        message: "Please enter an username or email",
      });
    }
    const user = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Please enter valid username or email",
      });
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Please enter valid password",
      });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      user._id,
    );
    const loggedInUser = await userModel
      .findById(user._id)
      .select("-password -refreshToken");
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "Logged In",
        data: loggedInUser,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error",
      error: error.message,
    });
  }
};
const logoutUser = async (req, res) => {
  await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    },
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      message: "User logged out",
      success: true,
    });
};
export { registerUser, loginUser, logoutUser };
