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
      return res.status(401).json({
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
const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, isCompleted } = req.body;

    const task = await todoModel.findOne({
      _id: taskId,
      createdBy: req.user._id,
    });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or you do not have permission to update it",
        data: {},
      });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (typeof isCompleted === "boolean") task.isCompleted = isCompleted;

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error",
      error: error.message,
    });
  }
};
const toggleTaskCompletion = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await todoModel.findOne({ taskId, createdBy: req.user._id });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or you do not have permission to modify it",
        data: {},
      });
    }
    task.isCompleted = !task.isCompleted
    await task.save();

    return res.status(200).json({
      success: true,
      message: `Task marked as ${task.isCompleted ? "completed" : "incomplete"}`,
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error",
      error: error.message,
    });
  }
};

export { createTask, updateTask, toggleTaskCompletion };
