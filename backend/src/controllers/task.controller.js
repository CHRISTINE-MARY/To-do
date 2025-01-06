const Task = require("../models/task.model");

const createTask = async (req, res) => {
  const task = req.body;
  if (!task.name || !task.deadline || task.status == undefined) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newTask = new Task(task);
  try {
    await newTask.save();
    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    console.error("Error in create task", error.message);
    res.status(500).json({ success: false, message: "Failed to add task" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Could not delete" });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = req.body;
  try {
    const updated = await Task.findByIdAndUpdate(id, task, { new: true });
    res.status(201).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: "failed to update" });
  }
};

const displayTasks = async (req, res) => {
  const { date } = req.query;
  try {
    const tasks = await Task.find({ deadline: date });
    res.status(201).json({ success: true, data: tasks });
  } catch (error) {
    res.status(400).json({ success: false, message: "failed to access" });
  }
};
module.exports = { createTask, deleteTask, updateTask, displayTasks };
