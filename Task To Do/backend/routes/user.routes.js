const express = require('express');
const { authUser, registerUser } = require('../controller/user.controller');
const protectedRoute = require('../middleware/auth.middleware');

const userRouter = express.Router();

userRouter.route('/login').post(authUser);
userRouter.route('/register').post(registerUser);

module.exports = userRouter;