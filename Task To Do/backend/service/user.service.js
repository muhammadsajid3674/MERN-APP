const generateToken = require("../config/util/generateToken");
const errorMessage = require("../helper/errorMessage");
const userRepository = require("../repository/user.repository");

class UserServices {
    registerUser = async (request) => {
        try {
            const { name, email, password } = request.body;
            const objToSend = { name, email, password };
            const response = await userRepository.registerUser(objToSend);
            return { ...response, token: generateToken(email) };
        } catch (error) {
            if (error.code) {
                return error;
            } else {
                errorMessage["003"].reason = error.message;
                return errorMessage["003"];
            }
        }
    }
    getUser = async (request) => {
        try {
            const { email } = request.body;
            if (!email) {
                return errorMessage["004"];
            }
            const response = await userRepository.getUser(email);
            return { ...response, token: generateToken(email) };
        } catch (error) {
            if (error.code) {
                return error;
            } else {
                errorMessage["003"].reason = error.message;
                return errorMessage["003"];
            }
        }
    }
}


module.exports = new UserServices();