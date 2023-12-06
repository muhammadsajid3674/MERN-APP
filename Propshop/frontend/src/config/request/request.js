import axios from 'axios';
import BASE_URI from '../BASE_URI';
import errorHandler from './errorHandler';
import successHandler from './successHandler';

axios.defaults.baseURL = BASE_URI;
// axios.defaults.withCredentials = true;

const request = {
    get: async (endPoint) => {
        try {
            const response = await axios.get(endPoint);
            return response.data;
        } catch (error) {
            return errorHandler(error);
        }
    },

    post: async (endPoint, jsonData, options = {}) => {
        try {
            const response = await axios.post(endPoint, jsonData);
            successHandler(response, {
                notifyOnSuccess: true,
            });
            return response.data;
        } catch (error) {
            return errorHandler(error);
        }
    },

    patch: async (endPoint, jsonData) => {
        try {
            const response = await axios.patch(endPoint, jsonData);
            successHandler(response, {
                notifyOnSuccess: true,
            });
            return response.data;
        } catch (error) {
            return errorHandler(error);
        }
    },

    delete: async (endPoint, id, options = {}) => {
        try {
            const response = await axios.delete(endPoint + '/delete/' + id);
            successHandler(response, {
                notifyOnSuccess: true,
            });
            return response.data;
        } catch (error) {
            return errorHandler(error);
        }
    },

    filter: async (endPoint, options = {}) => {
        try {
            let filter = options.filter ? 'filter=' + options.filter : '';
            let equal = options.equal ? '&equal=' + options.equal : '';
            let query = `?${filter}${equal}`;

            const response = await axios.get(endPoint + '/filter' + query);
            successHandler(response, {
                notifyOnSuccess: true,
            });
            return response.data;
        } catch (error) {
            return errorHandler(error);
        }
    },

    search: async (endPoint, options = {}) => {
        try {
            let query = '?';
            for (var key in options) {
                query += key + '=' + options[key] + '&';
            }
            query = query.slice(0, -1);
            // headersInstance.cancelToken = source.token;
            const response = await axios.get(endPoint + '/search' + query);

            successHandler(response, {
                notifyOnSuccess: true,
            });
            return response.data;
        } catch (error) {
            return errorHandler(error);
        }
    },

    upload: async (endPoint, id, jsonData) => {
        try {
            const response = await axios.patch(endPoint + '/upload/' + id, jsonData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            successHandler(response, {
                notifyOnSuccess: true,
            });
            return response.data;
        } catch (error) {
            return errorHandler(error);
        }
    },
};
export default request;
