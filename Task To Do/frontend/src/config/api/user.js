import axios from "axios";
import { BASE_URL } from "..";
import errorHandler from "../common/utils/errorHandler";

axios.defaults.baseURL = BASE_URL;

export const getUserList = async () => {
    try {
        const { data } = await axios.get("/user");
        return { error: null, data };
    } catch (error) {
        return errorHandler(error);
    }
};

export const login = async (credentials) => {
    try {
        const { data } = await axios.post("/user/login", credentials);
        return { error: null, data };
    } catch (error) {
        return errorHandler(error);
    }
};

export const register = async (credentials) => {
    try {
        const { data } = await axios.post("/user", credentials);
        return { error: null, data };
    } catch (error) {
        return errorHandler(error);
    }
}; 