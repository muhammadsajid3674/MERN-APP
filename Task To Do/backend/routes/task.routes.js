const express = require("express");
const { getTask, createTask, updateTask, deleteTask } = require("../controller/task.controller");
const authenticate = require("../middleware/auth.middleware");

const taskRouter = express.Router();

taskRouter.route('/').get(getTask).post(authenticate, createTask).put(authenticate, updateTask).delete(authenticate, deleteTask)
module.exports = taskRouter;