const pine = require('pine');

const logger = pine();

class ApiLogger {
    info(message) {
        logger.info(message);
    }
    info(message, data) {
        logger.info(`${message} ${undefined != data ? JSON.stringify(data) : ''}`);
    }
    error(message, data) {
        logger.error(message);
    }
}

module.exports = new ApiLogger();