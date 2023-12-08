import mongoose from "mongoose";
import logger from "./logger.js";
import envVars from "./env-vars.js";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(envVars.mongo_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        logger.info(`MongoDB is connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        logger.error(`MongoDb ERROR: ${error}`.red.underline.bold);
        process.exit(1)
    }
}

export default connectDB;