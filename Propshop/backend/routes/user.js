import express from 'express'
import { getUsersList, getUserProfile, updateUserProfile, deleteUser, updateUser, getUserById } from '../controller/user.js';
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.route('/').get(authMiddleware.authenticate, authMiddleware.authenticateAdmin, getUsersList)
userRouter.route('/profile').get(authMiddleware.authenticate, getUserProfile).put(authMiddleware.authenticate, updateUserProfile);
userRouter.route('/:id').get(authMiddleware.authenticate, authMiddleware.authenticateAdmin, getUserById).delete(authMiddleware.authenticate, authMiddleware.authenticateAdmin, deleteUser).put(authMiddleware.authenticate, authMiddleware.authenticateAdmin, updateUser);

export default userRouter;