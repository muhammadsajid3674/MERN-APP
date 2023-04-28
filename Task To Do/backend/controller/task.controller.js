const { responseJsonHandler } = require("../helper");
const logger = require("../logger/api.logger");
const taskService = require("../service/task.service");

const getTask = async (req, res) => {
    const data = await taskService.getTask();
    if (data.code) {
        logger.info('Controller: getTask');
        responseJsonHandler(data, null, res)
    } else {
        responseJsonHandler(null, data, res)
    }
}

const createTask = async (req, res) => {
    const data = await taskService.createTask(req);
    if (data.code) {
        logger.info('Controller: createTask');
        responseJsonHandler(data, null, res)
    } else {
        responseJsonHandler(null, data, res)
    }
}

const updateTask = async (req, res) => {
    const data = await taskService.updatedTask(req);
    if (data.code) {
        logger.info('Controller: updateTask');
        responseJsonHandler(data, null, res)
    } else {
        responseJsonHandler(null, data, res)
    }
}

const deleteTask = async (req, res) => {
    const data = await taskService.deleteTask(req)
    if (data.code) {
        logger.info('Controller: deleteTask');
        responseJsonHandler(data, null, res)
    } else {
        responseJsonHandler(null, data, res)
    }
}

module.exports = {
    getTask,
    createTask,
    updateTask,
    deleteTask
}