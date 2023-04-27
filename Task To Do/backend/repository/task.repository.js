const { connect } = require("../config/db.config");
const logger = require("../logger/api.logger");
const { Task } = require("../model/task.model");

class TaskRepositroy {
    constructor() {
        connect();
    }

    async getTask() {
        const tasks = await Task.find({});
        console.log('Tasks::: ' + tasks);
        return {
            message: 'Fetch Tasks',
            status: true,
            tasks
        };
    }

    async createTask(task) {
        let data = {};
        try {
            data = await Task.create(task);
        } catch (error) {
            logger.error('Error::: ' + error);
        }
        return {
            message: 'Task Created',
            status: true,
            data
        };
    }

    async updateTask(query, task) {
        let data = {};
        try {
            data = await Task.updateOne(query, task);
        } catch (error) {
            logger.error('Error::: ' + error);
        }
        return {
            message: 'Task Updated',
            status: true,
            data
        };
    }

    async deleteTask(taskId) {
        let data = {};
        try {
            data = await Task.deleteOne({ _id: taskId });
        } catch (error) {
            logger.error('Error::: ' + error);
        }
        return {
            message: 'Task Deleted',
            status: `${data.deleteCount > 0 ? true : false}`
        };
    }
}

module.exports = new TaskRepositroy();