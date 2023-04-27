const logger = require("../logger/api.logger");
const taskRepository = require("../repository/task.repository");

const getTask = (req, res) => {
    logger.info('Controller: getTask');
    taskRepository.getTask().then(data => res.json(data));
}

const createTask = (req, res) => {
    const { task } = req.body;
    console.log(task);
    task.createAt = Date.now();
    taskRepository.createTask(req.body.task).then(data => res.json(data))
}

const updateTask = (req, res) => {
    const { task } = req.body;
    const { id } = req.params;
    taskRepository.updateTask({ _id: id }, task).then((data) => res.json(data))
}

const deleteTask = (req, res) => {
    const { id } = req.params;
    taskRepository.deleteTask(id).then(data => res.json(data))
}

module.exports = {
    getTask,
    createTask,
    updateTask,
    deleteTask
}