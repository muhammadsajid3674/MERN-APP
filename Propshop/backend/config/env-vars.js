import { dirname, join } from 'path';

import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const MorganProd = {
    skip(req, res) {
        return res.statusCode <= 400;
    },
    stream: fs.createWriteStream(join(__dirname, '../../access.log'), { flags: 'a' }),
};

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
    mongo_uri: process.env.NODE_ENV === 'development' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI,
    rateLimitTime: process.env.RATE_LIMIT_TIME,
    rateLimitRequest: process.env.RATE_LIMIT_REQUEST,
    saltRound: process.env.NODE_ENV === 'development' ? 5 : 10,
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
    Level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    morganConfig: process.env.NODE_ENV === 'production' ? MorganProd : {},
    redisPort: process.env.REDIS_PORT,
    redisHost: process.env.REDIS_HOST,
};