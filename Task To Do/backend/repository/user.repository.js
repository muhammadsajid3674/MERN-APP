const generateToken = require("../config/util/generateToken");
const errorMessage = require("../helper/errorMessage");
const User = require("../model/user.model");

class UserRepository {

    registerUser(userObj) {
        return new Promise((resolve, reject) => {
            try {
                User.create(userObj).then(data => {
                    resolve({ message: "user created successfully", success: true, data })
                }).catch(err => {
                    errorMessage["001"].reason = err.message || "";
                    reject(errorMessage["001"]);
                })
            } catch (error) {
                errorMessage["003"].reason = error.message;
                reject(errorMessage["003"]);
            }
        });
    }

    getUser(userEmail) {
        return new Promise((resolve, reject) => {
            try {
                const findQuery = {
                    email: userEmail
                }
                User.findOne(findQuery).then(data => {
                    resolve({ message: "user get successfully", success: true, data })
                }).catch(err => {
                    errorMessage["002"].reason = err.message || "";
                    reject(errorMessage["002"]);
                })
            } catch (error) {
                errorMessage["003"].reason = error.message;
                reject(errorMessage["003"]);
            }
        });
    }

    getUserList() {
        return new Promise((resolve, reject) => {
            try {
                User.find({}).then(data => {
                    resolve({ message: "user list get successfully", success: true, data })
                }).catch(err => {
                    errorMessage["002"].reason = err.message || "";
                    reject(errorMessage["002"]);
                })
            } catch (error) {
                errorMessage["003"].reason = error.message;
                reject(errorMessage["003"]);
            }
        });
    }
}

module.exports = new UserRepository();