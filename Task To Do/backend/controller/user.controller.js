const logger = require("../logger/api.logger");
const userRepository = require("../repository/user.repository");

const authUser = (req, res) => {
    logger.info('Controller: authUser');
    userRepository.authUser(req.body.user)
        .then(data => res.json(data));
}

const registerUser = (req, res) => {
    logger.info('Controller :: registerUser');
    userRepository.registerUser(req.body.user)
        .then(data => res.json(data));
}

module.exports = {
    authUser,
    registerUser
}