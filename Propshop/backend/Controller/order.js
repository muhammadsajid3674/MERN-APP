import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import ErrorHandler from '../util/errorHandler.js';
import constants from '../util/constants.js';

/**
* Add Order Items
*
* @public
* @param {Request} req
* @param {Response} res
* @param {next} next
*/
export const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body;
    if (orderItems && orderItems.length === 0) {
        throw new ErrorHandler({ message: 'No order items', status: constants.NOT_FOUND })
        return
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        })
        const createdOrder = await order.save();
        res.status(constants.CREATED).json({ data: createdOrder, success: true })
    }
})

/**
* Get order by id
*
* @public
* @param {Request} req
* @param {Response} res
* @param {next} next
*/
export const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ErrorHandler({ message: 'No order items', status: constants.NOT_FOUND })
        return
    } else {
        const orderById = await Order.findById(id).populate('user', 'name email');
        res.status(constants.CREATED).json({ data: orderById, success: true })
    }
})

/**
* update order to paid
*
* @public
* @param {Request} req
* @param {Response} res
* @param {next} next
*/
export const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.PaymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const updateOrder = await order.save();
        res.status(constants.OK).json({ data: updateOrder, success: true });
    } else {
        throw new ErrorHandler({ message: 'Order not found', status: constants.NOT_FOUND })
    }
})

/**
* get order list
*
* @public
* @param {Request} req
* @param {Response} res
* @param {next} next
*/
export const getOrderList = asyncHandler(async (req, res) => {
    const orderList = await Order.find({ user: req.user._id });
    if (orderList) {
        res.status(constants.OK).json({ data: orderList, success: true });
    } else {
        throw new ErrorHandler({ message: 'Order not found', status: constants.NOT_FOUND })
    }
})