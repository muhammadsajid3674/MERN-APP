import axios from "axios"
import { BASE_URL } from "../.."
import successHandler from "./successHandler"
import errorHandler from "./errorHandler"

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

const request = {
    read: async ({ endPoint, id }) => {
        try {
            const response = await axios.get(endPoint + id);
            successHandler(response, {
                notifyOnFailed: true,
                notifyOnSuccess: false
            })
            return response.data
        } catch (error) {
            return errorHandler(error)
        }
    },
    list: async ({ endPoint, options = {} }) => {
        try {
            let query = '?';
            for (var key in options) {
                query += key + '=' + options[key] + '&'
            }
            query = query.slice(0, 1)
            const response = await axios.get(endPoint + query);
            successHandler(response, {
                notifyOnFailed: true,
                notifyOnSuccess: false
            })
            return response.data
        } catch (error) {
            return errorHandler(error)
        }
    },
    create: async ({ endPoint, jsonData }) => {
        try {
            const response = await axios.post(endPoint, jsonData);
            successHandler(response, {
                notifyOnFailed: false,
                notifyOnSuccess: true
            })
            return response.data
        } catch (error) {
            return errorHandler(error)
        }
    }
}

export default request;