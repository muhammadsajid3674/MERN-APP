// import envVars from "../config/env-vars.js";

import constants from "../util/constants.js";
import ErrorHandler from "../util/errorHandler.js";

export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
};

// const errorHandler = (err, req, res, next) => {
//     const statusCode = res.statusCode === 200 ? 500 : res.statusCode
//     res.status(statusCode)
//     res.json({
//         message: err.message,
//         stack: envVars.env === 'production' ? null : err.stack
//     })
// };

// export { errorHandler, notFound };  


export const error = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    let error = { ...err }

    error.message = err.message
    console.log('err :>> ', err.errors);

    // * Wrong Mongoose Object ID Error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        error = new ErrorHandler({ message, status: constants.BAD_REQUEST, errors: message });
    }

    // * Handling mongoose Validation error
    if (err.name === 'ValidationError') {
        const message = err.details.body.map(value => value.message);
        error = new ErrorHandler({ message: err.name, status: constants.BAD_REQUEST, errors: message });
    }

    res.status(err.statusCode).json({
        success: false,
        error,
        message: error.message,
        stack: error.stack
    })
}