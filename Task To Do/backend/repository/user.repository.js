const generateToken = require("../config/util/generateToken");
const logger = require("../logger/api.logger");
const User = require("../model/user.model");

class UserRepository {
    async authUser({ email, password }) {
        let user;
        try {
            user = await User.findOne({ email });
            if (user && await user.matchPassword(password)) {
                return {
                    message: 'User authenticated',
                    status: true,
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        token: generateToken(user._id)
                    }
                };
            }
        } catch (error) {
            logger.error('Error::: ' + error);
        }
        return {
            message: 'Invalid email or password',
            status: false
        };
    }

    async registerUser({ name, email, password }) {
        try {
            const userExits = await User.findOne({ email });
            if (userExits) {
                return {
                    message: 'Email already exists',
                    status: false
                }
            };
            const user = await User.create({ name, email, password })
            if (user) {
                return {
                    message: 'User Registered',
                    status: true,
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        token: generateToken(user._id)
                    }
                }
            } else {
                return {
                    message: 'Invalid user data',
                    status: false
                };
            }
        } catch (error) {
            logger.error('Error::: ' + error);
        }
    }
}

module.exports = new UserRepository();