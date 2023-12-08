import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import asyncErrorHandler from '../util/asyncErrorHandler.js';
import ErrorHandler from '../util/errorHandler.js';
import constants from '../util/constants.js';

// export const protectedRoute = asyncHandler(async (req, res, next) => {
//     let token;
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             token = req.headers.authorization.split(' ')[1];
//             const decoded = jwt.verify(token, process.env.JWT_SECRET)
//             req.user = await User.findById(decoded.id).select('-password')
//             next()
//         } catch (error) {
//             console.log(error);
//             res.status(401);
//             throw new Error('Not authorized, token failed')
//         }
//     }
//     if (!token) {
//         res.status(401);
//         throw new Error('Not authorized, no token')
//     }
// });

// export const admin = asyncHandler(async (req, res, next) => {
//     if (req.user && req.user.isAdmin) {
//         next();
//     } else {
//         res.status(401);
//         throw new Error('Not authorized as a admin');
//     }
// })

const authMiddleware = {

    // * Token Authorization
    authenticate: asyncErrorHandler(async (req, res, next) => {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                req.user = await User.findById(decoded.id).select('-password')
                next()
            } catch (error) {
                console.log(error);
                res.status(constants.UNAUTHORIZED);
                throw new ErrorHandler({ message: 'Not authorized, token failed', status: constants.UNAUTHORIZED })
            }
        }
        if (!token) {
            res.status(constants.UNAUTHORIZED);
            throw new ErrorHandler({ message: 'Not authorized, no token', status: constants.UNAUTHORIZED })
        }
    }),
    // * Merchant Authorization
    authenticateAdmin: asyncErrorHandler(async (req, res, next) => {
        const userId = req.userId;

        // * Check in DB
        //    const merchant = await User.findOne({ userId });

        if (req.user.isAdmin) {
            return next();
        }
        next(new ErrorHandler({ message: "Only merchants are allowed", status: constants.UNAUTHORIZED }));
    }),
    // * API Authorization
    authorize: (req, res, next) => {
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