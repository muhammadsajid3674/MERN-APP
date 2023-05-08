
import axios from "axios";
import { BASE_URL } from "../..";

class Api {
    constructor() {
        this.api_token = null;
        this.client = null;
        this.api_url = BASE_URL;
    }

    init() {
        this.api_token = localStorage.getItem('token');

        let headers = {
            Accept: "application/json",
        };

        if (this.api_token) {
            headers.Authorization = `Bearer ${this.api_token}`;
        }

        this.client = axios.create({
            baseURL: this.api_url,
            timeout: 31000,
            headers: headers,
        });

        return this.client;
    }
}

export class UserApi extends Api {
    getUserList() {
        return this.init().get("/user");
    }

    getUserAuth(objToSend) {
        return this.init().post("/user/login", objToSend);
    }

    addNewUser(objToSend) {
        return this.init().post("/user", objToSend)
    }
}

export class TaskApi extends Api {
    getTaskList() {
        return this.init().get('/todo')
    }
    addNewTask(id, objToSend) {
        return this.init().post('/todo', objToSend)
    }
    deleteTask(id) {
        return this.init().delete(`/todo/${id}`)
    }
}