const express = require('express');
const { getUser, registerUser } = require('../controller/user.controller');

const userRouter = express.Router();

userRouter.route('/').post(registerUser);
userRouter.route('/login').post(getUser);

module.exports = userRouter;