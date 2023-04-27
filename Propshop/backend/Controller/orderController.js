import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc Add Order Items
// @route POST /api/orders
// @access Private
export const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body;
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
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
        res.status(201).json(createdOrder)
    }
})


// @desc Get order by id
// @route GET /api/order/:id
// @access Private
export const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        const orderById = await Order.findById(id).populate('user', 'name email');
        res.status(201).json(orderById)
    }
})

// @desc update order to paid
// @route PUT /api/order/:id/pay
// @access Private
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
        res.json(updateOrder);
    } else {
        throw new Error('Order not found');
    }
})

// @desc get order list
// @route GET /api/order
// @access Private
export const getOrderList = asyncHandler(async (req, res) => {
    const orderList = await Order.find({ user: req.user._id });
    if (orderList) {
        res.json(orderList);
    } else {
        throw new Error('Order not found');
    }
})