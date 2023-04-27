const mongoose = require('mongoose');
const logger = require('../logger/api.logger');
require('dotenv').config();

const connect = () => {
    const url = process.env.MONGO_CONNECTION_STRING;

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    mongoose.connection.once("open", async () => {
        logger.info("Connected to Database")
    });

    mongoose.connection.on("error", async (err) => {
        logger.info("Error connecting to database" + err)
    });
}

const disconnect = () => {
    if (!mongoose.connection) {
        return;
    };
    mongoose.disconnect();

    mongoose.once("close", async () => {
        console.log("Disconnected from database");
    });
};

module.exports = {
    connect,
    disconnect
}