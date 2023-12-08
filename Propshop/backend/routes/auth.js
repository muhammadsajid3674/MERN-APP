import express from 'express'
import { login, signup } from '../controller/auth.js';
import { validate } from 'express-validation';
import { Login, Register } from '../validations/auth.js';

const authRouter = express.Router();

authRouter.route('/register').post(validate(Register), signup);
authRouter.route('/login').post(validate(Login), login);

export default authRouter;