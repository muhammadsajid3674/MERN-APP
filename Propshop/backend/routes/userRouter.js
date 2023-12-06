import express from 'express'
import { authUser, getUsersList, getUserProfile, registerUser, updateUserProfile, deleteUser, updateUser, getUserById } from '../Controller/userController.js';
import { protectedRoute, admin } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.route('/').get(protectedRoute, admin, getUsersList)
userRouter.route('/register').post(registerUser);
userRouter.post('/login', authUser);
userRouter.route('/profile').get(protectedRoute, getUserProfile).put(protectedRoute, updateUserProfile);
userRouter.route('/:id').get(protectedRoute, admin, getUserById).delete(protectedRoute, admin, deleteUser).put(protectedRoute, admin, updateUser);

export default userRouter;