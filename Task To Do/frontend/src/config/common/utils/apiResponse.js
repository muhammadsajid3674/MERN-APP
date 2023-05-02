import axios from 'axios'
import { BASE_URL } from '../..';

export const getUserToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
        return token;
    }
};

export const getHeader = () => {
    return {
        Authorization: "Bearer" + " " + getUserToken(),
    };
};

export const postMethodCustomHeader = (relativesUrl, obj) => {
    return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}/${relativesUrl}`, obj, { headers: getHeader() })
            .then(res => resolve(res))
            .catch(err => reject(err))
    });
}

export const postMethodWithoutToken = (relativesUrl, obj) => {
    return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}/${relativesUrl}`, obj)
            .then(res => resolve(res))
            .catch(err => reject(err))
    });
}

export const getMethodCustomHeader = (relativesUrl) => {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/${relativesUrl}`, { headers: getHeader() })
            .then(res => resolve(res))
            .catch(err => reject(err))
    });
}

export const getMethodWithoutToken = (relativesUrl) => {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/${relativesUrl}`)
            .then(res => resolve(res))
            .catch(err => reject(err))
    });
}

export const putMethodCustomHeader = (relativesUrl, obj) => {
    return new Promise((resolve, reject) => {
        axios.put(`${BASE_URL}/${relativesUrl}`, obj, { headers: getHeader() })
            .then(res => resolve(res))
            .catch(err => reject(err))
    });
}

export const deleteMethodCustomHeader = (relativesUrl, obj) => {
    return new Promise((resolve, reject) => {
        axios.delte(`${BASE_URL}/${relativesUrl}`, obj, { headers: getHeader() })
            .then(res => resolve(res))
            .catch(err => reject(err))
    });
}