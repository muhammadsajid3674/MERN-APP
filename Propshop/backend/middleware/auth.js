import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import asyncErrorHandler from '../util/asyncErrorHandler.js';
import ErrorHandler from '../util/errorHandler.js';
import constants from '../util/constants.js';
import envVars from '../config/env-vars.js';

const authMiddleware = {

    // * Token Authorization
    authenticate: asyncErrorHandler(async (req, res, next) => {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, envVars.jwtSecret);
                console.log('decoded :>> ', decoded);
                req.user = await User.findById(decoded.user.id).select('-password')
                next()
            } catch (error) {
                console.log(error);
                res.status(constants.UNAUTHORIZED);
                throw new ErrorHandler({ message: 'Not authorized, token failed/expired', status: constants.UNAUTHORIZED })
            }
        }
        if (!token) {
            res.status(constants.UNAUTHORIZED);
            throw new ErrorHandler({ message: 'Not authorized, no token', status: constants.UNAUTHORIZED })
        }
    }),

    // * Merchant Authorization
    authenticateAdmin: asyncErrorHandler(async (req, res, next) => {
        const userId = req.user._id;

        // * Check in DB
        const user = await User.findById(userId);
        console.log('user :>> ', user);
        if (user?.isAdmin) {
            return next();
        }
        next(new ErrorHandler({ message: "Only admin are allowed", status: constants.UNAUTHORIZED }));
    }),

    // * API Authorization
    authorize: (req, res, next) => {
        console.log('object :>> ', req.headers.authorization);
        let authKey;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            authKey = req.headers.authorization.split(" ")[1];
            if (!authKey || authKey !== process.env.AUTHKEY) {
                return next(new ErrorHandler({ message: "Unauthorized", status: constants.UNAUTHORIZED }));
            }
            next();
        } else {
            return next(new ErrorHandler({ message: "API Key not found", status: constants.NOT_FOUND }));
        }
    },
};

export default authMiddleware;