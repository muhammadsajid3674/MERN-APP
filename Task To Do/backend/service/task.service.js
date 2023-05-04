const taskRepository = require("../repository/task.repository")

class TaskService {
    getTask = async () => {
        try {
            const response = await taskRepository.getTask();
            return response;
        } catch (error) {
            if (error.code) {
                return error;
            } else {
                errorMessage["003"].reason = error.message;
                return errorMessage["003"];
            }
        }
    }
    createTask = async (request) => {
        try {
            const { title, description, dueDate, completed, user } = request.body;
            const objToSend = { title, description, due_date: dueDate, completed, user };
            const response = await taskRepository.createTask(objToSend);
            return response;
        } catch (error) {
            if (error.code) {
                return error;
            } else {
                errorMessage["003"].reason = error.message;
                return errorMessage["003"];
            }
        }
    }
    updatedTask = async (request) => {
        try {
            const { title, description, dueDate, taskId, completed } = request.body;
            const objToSend = { title, description, due_date: dueDate, completed };
            const response = await taskRepository.updateTask(taskId, objToSend);
            return response;
        } catch (error) {
            if (error.code) {
                return error;
            } else {
                errorMessage["003"].reason = error.message;
                return errorMessage["003"];
            }
        }
    }
    deleteTask = async (request) => {
        try {
            const { taskId } = request.params;
            const response = await taskRepository.deleteTask(taskId);
            return response;
        } catch (error) {
            if (error.code) {
                return error;
            } else {
                errorMessage["003"].reason = error.message;
                return errorMessage["003"];
            }
        }
    }
}

module.exports = new TaskService()