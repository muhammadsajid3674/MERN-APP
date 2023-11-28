import axios from "axios"
import errorHandler from "../../common/request/errorHandler"
import successHandler from "../../common/request/successHandler";
import { BASE_URL } from "../..";

axios.defaults.baseURL = BASE_URL;
// axios.defaults.withCredentials = true

export const login = async ({ credentials }) => {
    try {
        const response = await axios.post('/user/login', credentials);
        const { status, data } = response;
        successHandler(
            { data, status },
            {
                notifyOnSuccess: false,
                notifyOnFailed: true,
            }
        );
        return response.data
    } catch (error) {
        return errorHandler(error)
    }
}