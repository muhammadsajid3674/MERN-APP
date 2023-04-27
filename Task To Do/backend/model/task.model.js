const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: 'string',
    description: 'string',
    createAt: 'date',
    updateAt: 'date',
    createBy: 'string',
    updateBy: 'string'
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Task = mongoose.model('todos', taskSchema);

module.exports = {
    Task
}