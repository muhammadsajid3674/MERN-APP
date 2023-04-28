const express = require("express");
const { getTask, createTask, updateTask, deleteTask, taskStatus } = require("../controller/task.controller");

const taskRouter = express.Router();

taskRouter.route('/').get(getTask).post(createTask).put(updateTask).delete(deleteTask)
module.exports = taskRouter;