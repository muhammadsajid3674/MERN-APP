const express = require('express');
const { getUser, registerUser, getUserList } = require('../controller/user.controller');

const userRouter = express.Router();

userRouter.route('/').post(registerUser).get(getUserList);
userRouter.route('/login').post(getUser);

module.exports = userRouter;