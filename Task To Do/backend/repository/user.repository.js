const generateToken = require("../config/util/generateToken");
const errorMessage = require("../helper/errorMessage");
const User = require("../model/user.model");

class UserRepository {

    async registerUser(userObj) {
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

    async getUser(userId) {
        return new Promise((resolve, reject) => {
            try {
                const findQuery = {
                    _id: userId
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
        // let user;
        // try {
        //     user = await User.findOne({ email });
        //     if (user && await user.matchPassword(password)) {
        //         return {
        //             message: 'User authenticated',
        //             status: true,
        //             user: {
        //                 _id: user._id,
        //                 name: user.name,
        //                 email: user.email,
        //                 isAdmin: user.isAdmin,
        //                 token: generateToken(user._id)
        //             }
        //         };
        //     }
        // } catch (error) {
        //     logger.error('Error::: ' + error);
        // }
        // return {
        //     message: 'Invalid email or password',
        //     status: false
        // };
    }
}

module.exports = new UserRepository();