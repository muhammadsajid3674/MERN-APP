import React, { useEffect, useState } from 'react'
import { orderDetail, orderPayment } from '../config/Redux/Action/orderAction'
import { withRouterAndRedux } from '../config/util/withRouterAndRedux'
import { Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MessageAlert from '../components/MessageAlert';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2'
import BASE_URI from '../config/BASE_URI';
import axios from 'axios';
import { actionType } from '../config/Redux/Constant/orderConstant';

const OrderDetailScreen = ({ dispatch, params }) => {
    const [sdkReady, setSdkReady] = useState(null);
    const state = useSelector(state => state);
    const { order, loading, error } = state.orderDetail;
    const { loading: loadingPayment, success: successPay } = state.orderPay;

    if (!loading) {
        //Calculate Price
        state.orderDetail.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
        state.orderDetail.shippingPrice = state.orderDetail.itemsPrice > 1000 ? 0 : 100;
        state.orderDetail.taxPrice = Number(0.15 * state.orderDetail.itemsPrice).toFixed(2);
        state.orderDetail.totalPrice = Number(state.orderDetail.itemsPrice) + Number(state.orderDetail.shippingPrice) + Number(state.orderDetail.taxPrice);
    }

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(orderPayment(params.id, paymentResult))
    }

    useEffect(() => {
        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get(`${BASE_URI}/api/config/paypal`);
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.onload = () => setSdkReady(true);
            document.body.appendChild(script);
        }

        if (!order || order._id !== params.id || successPay) {
            dispatch({ type: actionType.ORDER_PAY_RESET })
            dispatch(orderDetail(params.id))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [order, dispatch, params, successPay])

    if (loading) return <div className='d-flex justify-content-center align-items-center' style={{ height: '60vh' }}>
        <Loader />
    </div>

    else if (error) return <MessageAlert variant='danger'>{error}</MessageAlert>

    return (
        <Row className='justify-content-between'>
            <Col md={12} className='mb-3'>
                <h1>Order {order._id}</h1>
            </Col>
            <Col md={6}>
                <div>
                    <h2>Shipping</h2>
                    <p>Name: {order.user.name} </p>
                    <p>Email: <a href={`mailto:${order.user.email}`}>{order.user.email}</a> </p>
                    <p>Address: {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postal}, {order.shippingAddress.country} </p>
                    {order.isDelivered ? <p>Deliver At: {order.deliverAt} </p> : <MessageAlert variant='danger'>Not Delivered</MessageAlert>}
                </div>
                <hr />
                <div>
                    <h2>Payment Method</h2>
                    <p>Method: {order.paymentMethod} </p>
                    {order.isPaid ? <p> <MessageAlert variant='success'>Paid At: {order.paidAt}</MessageAlert> </p> : <MessageAlert variant='danger'>Not Paid</MessageAlert>}
                </div>
                <hr />
                <div>
                    <h2>Order Items</h2>
                    {!order.orderItems || order.orderItems.length === 0 ? (
                        <MessageAlert>
                            Your cart is empty <Link to='/'>Go Back</Link>
                        </MessageAlert>
                    ) : (
                        order.orderItems.length > 0 && order.orderItems.map((item, index) => {
                            let cartItemImage;
                            if (item.image) {
                                cartItemImage = require(`../${item.image}`)
                            }
                            return <ListGroup key={index} style={{ backgroundColor: "#fff", marginBottom: '0.5rem' }}>
                                <Row className='align-items-center'>
                                    <Col md={2}>
                                        <Image src={cartItemImage} alt={item.name} fluid />
                                    </Col>
                                    <Col md={4} className='flex-grow-1'>{item.name}</Col>
                                    <Col>{item.qty} x $ {item.price} = {(item.qty * item.price).toFixed(2)}</Col>
                                </Row>
                            </ListGroup>
                        })
                    )}
                </div>
            </Col>
            <Col md={4}>
                <ListGroup>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items:</Col>
                            <Col>$ {state.orderDetail.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping:</Col>
                            <Col>$ {state.orderDetail.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax:</Col>
                            <Col>$ {state.orderDetail.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total:</Col>
                            <Col>$ {state.orderDetail.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    {!order.isPaid &&
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    {loadingPayment && <Loader />}
                                    {!sdkReady ? <Loader /> : <PayPalButton
                                        amount={state.orderDetail.totalPrice}
                                        onSuccess={successPaymentHandler}
                                    />}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    }
                </ListGroup>
                {/* {error && <MessageAlert variant='danger'>{error}</MessageAlert>} */}
            </Col>
        </Row>
    )
}

export default withRouterAndRedux(OrderDetailScreen)