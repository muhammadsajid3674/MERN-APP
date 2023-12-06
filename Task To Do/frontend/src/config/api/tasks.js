import axios from "axios";
import errorHandler from "../common/utils/errorHandler";

export const getTaskList = async () => {
    try {
        const { data } = await axios.get("/todo");
        return { error: null, data };
    } catch (error) {
        return errorHandler(error);
    }
};

export const addTask = async (obj) => {
    try {
        const { data } = await axios.post("/todo", obj);
        return { error: null, data };
    } catch (error) {
        return errorHandler(error);
    }
};

export const deleteTask = async (id) => {
    try {
        const { data } = await axios.delete(`/todo/${id}`);
        return { error: null, data };
    } catch (error) {
        return errorHandler(error);
    }
};

export const updateTask = async (id, obj) => {
    try {
        const { data } = await axios.put(`/todo/${id}`, obj);
        return { error: null, data };
    } catch (error) {
        return errorHandler(error);
    }
};