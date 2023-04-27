import React, { useEffect } from 'react'
import { Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';
import LoadingButton from '../components/LoadingButton';
import MessageAlert from '../components/MessageAlert';
import { createOrder } from '../config/Redux/Action/orderAction';
import { withRouterAndRedux } from '../config/util/withRouterAndRedux';

const OrderScreen = ({ state, dispatch, navigate }) => {
    const { cartItems, shippingAddress, paymentMethod } = state.cart;
    const { order, error, success, loading } = state.orderList;
    //Calculate Price
    state.cart.itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    state.cart.shippingPrice = state.cart.itemsPrice > 1000 ? 0 : 100;
    state.cart.taxPrice = Number(0.15 * state.cart.itemsPrice).toFixed(2);
    state.cart.totalPrice = Number(state.cart.itemsPrice) + Number(state.cart.shippingPrice) + Number(state.cart.taxPrice);

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
        }
    }, [success, navigate, order])


    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            itemsPrice: state.cart.itemsPrice,
            shippingPrice: state.cart.shippingPrice,
            taxPrice: state.cart.taxPrice,
            totalPrice: state.cart.totalPrice,
        }))
    }
    return (
        <>
            <CheckOutSteps signIn shipping payment orderPlace />
            <Row className='justify-content-between'>
                <Col md={6}>
                    <div>
                        <h2>Shipping Address</h2>
                        <p>Address: {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postal}, {shippingAddress.country} </p>
                    </div>
                    <hr />
                    <div>
                        <h2>Payment Method</h2>
                        <p>Method: {paymentMethod} </p>
                    </div>
                    <hr />
                    <div>
                        <h2>Order Items</h2>
                        {!cartItems || cartItems.length === 0 ? (
                            <MessageAlert>
                                Your cart is empty <Link to='/'>Go Back</Link>
                            </MessageAlert>
                        ) : (
                            cartItems.length > 0 && cartItems.map((item, index) => {
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
                                        <Col>{item.qty} x $ {item.price} = {item.qty * item.price}</Col>
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
                                <Col>$ {state.cart?.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>$ {state.cart?.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>$ {state.cart?.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>$ {state.cart?.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <LoadingButton
                                        variant='primary'
                                        type='submit'
                                        label='Place Order'
                                        isLoading={loading}
                                        disabled={!cartItems.length > 0 && true}
                                        onClick={placeOrderHandler}
                                    />
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                    {error && <MessageAlert variant='danger'>{error}</MessageAlert>}
                </Col>
            </Row>
        </>
    )
}

export default withRouterAndRedux(OrderScreen)