const express = require("express");
const router = express.Router();
const {
  createTask,
  deleteTask,
  updateTask,
  displayTasks,
} = require("../controllers/task.controller.js");

router.post("/task", createTask);

router.delete("/task/:id", deleteTask);

router.patch("/task/:id", updateTask);

router.get("/task", displayTasks);

module.exports = router;
