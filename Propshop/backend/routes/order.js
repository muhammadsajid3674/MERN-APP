import express from 'express'
import { addOrderItems, getOrderById, getOrderList, updateOrderToPaid } from '../controller/order.js';
import authMiddleware from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.route('/').post(authMiddleware.authenticate, addOrderItems);
orderRouter.route('/').get(authMiddleware.authenticate, getOrderList);
orderRouter.route('/:id').get(authMiddleware.authenticate, getOrderById);
orderRouter.route('/:id/pay').put(authMiddleware.authenticate, updateOrderToPaid);

export default orderRouter;