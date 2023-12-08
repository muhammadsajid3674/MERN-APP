import { createLogger, format, transports } from 'winston';
import envVars from './env-vars.js';
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
const formatParams = (info) => {
    const {
        timestamp, level, message, ...args
    } = info;
    const ts = timestamp.slice(0, 19).replace('T', ' ');

    return `${ts} ${level}: ${message} ${Object.keys(args).length
        ? JSON.stringify(args, '', '')
        : ''}`;
};

const Format = format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf(formatParams),
);

const transportArray = (
    envVars.env === 'production'
        ? [new transports.File({ filename: 'error.log', level: 'error' })]
        : [new transports.Console()]
);

const logger = createLogger({
    level: envVars.Level,
    format: Format,
    transports: transportArray,
});

export default logger;