const express = require("express");
const { getTask, createTask, updateTask, deleteTask } = require("../controller/task.controller");
const taskRouter = express.Router();

taskRouter.route('/').get(getTask).post(createTask)
taskRouter.route('/:id').put(updateTask).delete(deleteTask)

module.exports = taskRouter;