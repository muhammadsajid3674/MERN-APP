import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log(`MongoDB is connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(`MongoDb ERROR: ${error}`.red.underline.bold);
        process.exit(1)
    }
}

export default connectDB;