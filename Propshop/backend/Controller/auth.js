
import User from '../models/user.js';
import asyncErrorHandler from '../util/asyncErrorHandler.js';
import constants from '../util/constants.js';
import { generateTokenResponse } from '../util/utils.js';


/**
 * Authenticate User
 *
 * @public
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */
const login = asyncErrorHandler(async (req, res, next) => {
    const { user, accessToken } = await User.ValidateUserAndGenerateToken(req.body);
    const tokens = generateTokenResponse(user, accessToken);
    res.status(constants.OK).json({ data: { tokens, user }, success: true });
})

/**
 * Register a new User
 *
 * @public
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */
const signup = async (req, res, next) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(constants.CREATED).json({ data: { token: user.token(), user: savedUser.transform() }, success: true });
    } catch (error) {
        return next(User.checkDuplication(error));
    }
}


export { login, signup };