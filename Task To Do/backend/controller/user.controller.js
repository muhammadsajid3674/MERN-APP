const { responseJsonHandler } = require("../helper");
const logger = require("../logger/api.logger");
const userService = require("../service/user.service");

const getUser = async (req, res) => {
    const data = await userService.getUser(req);
    if (data.code) {
        logger.info('Controller: getUser');
        responseJsonHandler(data, null, res)
    } else {
        responseJsonHandler(null, data, res)
    }
}

const registerUser = async (req, res) => {
    const data = await userService.registerUser(req)
    if (data.code) {
        logger.info('Controller :: registerUser');
        responseJsonHandler(data, null, res)
    } else {
        responseJsonHandler(null, data, res)
    }
}

const getUserList = async (req, res) => {
    const data = await userService.getUserList();
    if (data.code) {
        logger.info('Controller :: getUserList');
        responseJsonHandler(data, null, res)
    } else {
        responseJsonHandler(null, data, res)
    }
}

module.exports = {
    getUser,
    registerUser,
    getUserList
}