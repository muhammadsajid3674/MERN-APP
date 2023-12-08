import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors';
// import productRouter from './routes/productRoutes.js'
// import userRouter from './routes/userRouter.js';
// import orderRouter from './routes/orderRoutes.js';
import http from 'http';
import logger from './config/logger.js';
import envVars from './config/env-vars.js';
import Routes from './routes/routes.js';
import { error, notFound } from './middleware/error.js';
import authMiddleware from './middleware/auth.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const DB_URL = 'mongodb+srv://admin:admin123@cluster0.s4xr5cb.mongodb.net/proshop?retryWrites=true&w=majority';


// app.use('/api/product', productRouter);
// app.use('/api/user', userRouter);
// app.use('/api/order', orderRouter);
// app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))



app.get("/", authMiddleware.authorize, (req, res) =>
    res.send("Server is healthy! 💪")
);


// * Routes
app.use("/api", Routes());


app.use(notFound);
app.use(error);

const server = http.createServer(app)
server.listen(envVars.port)
server.on('listening', () => {
    connectDB(DB_URL);
    logger.info(`${envVars.env.toUpperCase()} Server is Listening on PORT ${envVars.port}`.yellow);
})

const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof envVars.port === 'string' ? `Pipe ${envVars.port}` : `Port ${envVars.port}`;
    switch (error.code) {
        case 'EACCES':
            logger.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};

server.on('error', onError);