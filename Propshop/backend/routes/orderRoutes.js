import express from 'express'
import { addOrderItems, getOrderById, getOrderList, updateOrderToPaid } from '../Controller/orderController.js';
import { protectedRoute } from '../middleware/authMiddleware.js';

const orderRouter = express.Router();

orderRouter.route('/').post(protectedRoute, addOrderItems);
orderRouter.route('/').get(protectedRoute, getOrderList);
orderRouter.route('/:id').get(protectedRoute, getOrderById);
orderRouter.route('/:id/pay').put(protectedRoute, updateOrderToPaid);

export default orderRouter;