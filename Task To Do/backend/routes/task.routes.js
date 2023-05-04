const express = require("express");
const { getTask, createTask, updateTask, deleteTask } = require("../controller/task.controller");
const authenticate = require("../middleware/auth.middleware");

const taskRouter = express.Router();

taskRouter.route('/').get(authenticate, getTask).post(authenticate, createTask).put(authenticate, updateTask)
taskRouter.route('/:taskId').delete(authenticate, deleteTask)
module.exports = taskRouter;