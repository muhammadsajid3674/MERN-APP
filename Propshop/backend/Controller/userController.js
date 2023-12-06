import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generatetoken from '../util/generateToken.js';

// @desc Fetch auth user
// @route POST /api/user/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generatetoken(user._id)
            }
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc Fetch user profile
// @route GET /api/user/profile
// @access Public
const getUserProfile = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById({ _id });
    if (user) {
        res.json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generatetoken(user._id)
            }
        })
    } else {
        res.status(401)
        throw new Error('User not found')
    }
})

// @desc Fetch user profile
// @route PUT /api/user/profile
// @access Public
const updateUserProfile = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById({ _id });
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password
        };
        const updated = await user.save();
        res.json({
            success: true,
            data: {
                _id: updated._id,
                name: updated.name,
                email: updated.email,
                isAdmin: updated.isAdmin,
                token: generatetoken(updated._id)
            }
        });
    } else {
        res.status(401)
        throw new Error('User not found');
    };
});

// @desc Register User
// @route POST /api/user
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('Email is already in used')
    };
    const user = await User.create({
        name,
        email,
        password
    });
    if (user) {
        res.status(200)
        res.json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generatetoken(user._id)
            }
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    };
});

// @desc get all users
// @route GET /api/user
// @access Public/admin
const getUsersList = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json({
        success: true,
        data: users
    });
});

// @desc get all users
// @route GET /api/user/:id
// @access Public/admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json({
        success: true,
        data: user
    });
});

// @desc delete single user
// @route DELETE /api/user/:id
// @access Public/admin
const deleteUser = asyncHandler(async (req, res) => {
    const deletedUser = await User.deleteOne({ _id: req.params.id })
    res.json({
        message: 'User is deleted',
        success: true,
        data: deletedUser
    });
});

// @desc Update User
// @route PUT /api/user/:id
// @access Public/admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById({ _id: req.params.id });
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;
        const updated = await user.save()
        res.json({
            success: true,
            data: {
                _id: updated._id,
                name: updated.name,
                email: updated.email,
                isAdmin: updated.isAdmin,
                token: generatetoken(updated._id)
            }
        })
    } else {
        res.status(401)
        throw new Error('User not found')
    };
});

export { authUser, registerUser, getUserProfile, updateUserProfile, getUsersList, deleteUser, updateUser, getUserById };