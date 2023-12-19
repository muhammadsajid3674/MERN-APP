import User from '../models/user.js';
import asyncErrorHandler from '../util/asyncErrorHandler.js';
import constants from '../util/constants.js';

/**
 * Fetch user profile
 *
 * @public
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */
const getUserProfile = asyncErrorHandler(async (req, res) => {
    console.log('req.user :>> ', req.user);
    const { _id } = req.user;
    const user = await User.findById({ _id });
    if (user) {
        res.status(constants.OK).json({ success: true, data: user })
    } else {
        throw new ErrorHandler({ message: 'User not found', status: constants.NOT_FOUND });
    }
})

/**
 * Update user profile
 *
 * @public
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */
const updateUserProfile = asyncErrorHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById({ _id });
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password
        };
        const updatedUser = await user.save();
        res.status(constants.OK).json({ success: true, data: updatedUser });
    } else {
        throw new ErrorHandler({ message: 'User not found', status: constants.NOT_FOUND });
    };
});

/**
* get all users
*
* @public
* @param {Request} req
* @param {Response} res
* @param {next} next
*/
const getUsersList = asyncErrorHandler(async (req, res) => {
    const users = await User.find({});
    res.json({
        success: true,
        data: users
    });
});

/**
* get users by id
*
* @public
* @param {Request} req
* @param {Response} res
* @param {next} next
*/
const getUserById = asyncErrorHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json({
        success: true,
        data: user
    });
});

/**
* delete single user
*
* @public
* @param {Request} req
* @param {Response} res
* @param {next} next
*/
const deleteUser = asyncErrorHandler(async (req, res) => {
    const deletedUser = await User.deleteOne({ _id: req.params.id })
    res.json({
        message: 'User is deleted',
        success: true,
        data: deletedUser
    });
});

/**
* Update User
*
* @public
* @param {Request} req
* @param {Response} res
* @param {next} next
*/
const updateUser = asyncErrorHandler(async (req, res) => {
    const user = await User.findById({ _id: req.params.id });
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;
        const updated = await user.save()
        res.json({
            success: true,
            data: updated
        })
    } else {
        throw new ErrorHandler({ message: 'User not found', status: constants.NOT_FOUND });
    };
});

export { getUserProfile, updateUserProfile, getUsersList, deleteUser, updateUser, getUserById };