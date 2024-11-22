import connectDB from "../db/index.js";
import todoModel from "../models/todosModel.model.js";
import userModel from "../models/userModel.model.js";
connectDB();
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user = await userModel.findById(req.user?._id);
    if (!title || !description) {
      return res.status(400).json({
        message: "Please enter title and description",
        success: false,
        data: {},
      });
    }
    const existingTask = await todoModel.findOne({
      title,
      createdBy: req.user?._id,
    });
    if (existingTask) {
      return res.status(400).json({
        message: `${title} already exist choose another title`,
        success: false,
        data: {},
      });
    }
    const newTask = await todoModel.create({
      title,
      description,
      isCompleted: false,
      createdBy: req.user._id,
    });
    return res.status(201).json({
      success: true,
      message: "Task Created",
      data: newTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error",
      error: error.message,
    });
  }
};

export { createTask };