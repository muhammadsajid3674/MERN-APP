const { connect } = require("../config/db.config");
const errorMessage = require("../helper/errorMessage");
const logger = require("../logger/api.logger");
const Task = require("../model/task.model");

class TaskRepositroy {
    constructor() {
        connect();
    }

    getTask() {
        return new Promise((resolve, reject) => {
            try {
                Task.find({}).then(data => {
                    resolve({ message: "Task get", success: true, data })
                }).catch(error => {
                    errorMessage["002"].reason = error.message;
                    reject(errorMessage["002"]);
                })
            } catch (error) {
                errorMessage["003"].reason = error.message;
                reject(errorMessage["003"]);
            }
        });
    }

    async createTask(task) {
        return new Promise((resolve, reject) => {
            try {
                Task.create(task).then(data => {
                    resolve({ message: "Task created", success: true, data })
                }).catch(error => {
                    errorMessage["002"].reason = error.message;
                    reject(errorMessage["002"]);
                })
            } catch (error) {
                errorMessage["003"].reason = error.message;
                reject(errorMessage["003"]);
            }
        });
    }

    updateTask(searchId, updatedTask) {
        return new Promise((resolve, reject) => {
            try {
                Task.findByIdAndUpdate(searchId, updatedTask).then(data => {
                    resolve({ message: "Task updated", success: true, data })
                }).catch(error => {
                    errorMessage["002"].reason = error.message;
                    reject(errorMessage["002"]);
                })
            } catch (error) {
                errorMessage["003"].reason = error.message;
                reject(errorMessage["003"]);
            }
        });
    }

    deleteTask(taskId) {
        return new Promise((resolve, reject) => {
            try {
                let deleteQuery = {
                    _id: taskId
                }
                Task.deleteOne(deleteQuery).then(data => {
                    resolve({ message: "Task updated", success: true, data })
                }).catch(error => {
                    errorMessage["002"].reason = error.message;
                    reject(errorMessage["002"]);
                })
            } catch (error) {
                errorMessage["003"].reason = error.message;
                reject(errorMessage["003"]);
            }
        });
    }
}

module.exports = new TaskRepositroy();