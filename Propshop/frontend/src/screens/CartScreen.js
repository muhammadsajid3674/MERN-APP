import React, { useEffect } from 'react'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MessageAlert from '../components/MessageAlert';
import { addToCart, removeFromCart } from '../config/Redux/Action/cart';
import { withRouterAndRedux } from '../config/util/withRouterAndRedux';

const CartScreen = ({ navigate, params, dispatch, state }) => {

  const { items } = state.cart;
  const { currentUser, authenticated } = state.auth;
  const qty = window.location.search ? window.location.search.split('=')[1] : 1;

  const checkOutHandler = () => {
    if (!currentUser) {
      navigate('/login?redirect=shipping')
    } else {
      navigate('/shipping')
    }
  }

  useEffect(() => {
    dispatch(addToCart(params.id, qty))
  }, [dispatch, params.id, qty])
  return (
    <Row className='justify-content-between'>
      <Col md={6}>
        <h1>Shopping Cart</h1>
        {!items || items.length === 0 ? (
          <MessageAlert>
            Your cart is empty <Link to='/'>Go Back</Link>
          </MessageAlert>
        ) : (
          items.length > 0 && items.map((item, index) => {
            let cartItemImage;
            if (item.image) {
              cartItemImage = require(`../${item.image}`)
            }
            return <ListGroup key={index} style={{ backgroundColor: "#fff", marginBottom: '0.5rem' }}>
              <Row className='align-items-center'>
                <Col md={2}>
                  <Image src={cartItemImage} alt={item.name} fluid />
                </Col>
                <Col md={4}>{item.name}</Col>
                <Col md={2}>$ {item.price}</Col>
                <Col md={2}>
                  <Form.Select value={item.qty} onChange={(e) => dispatch(addToCart(item._id, e.target.value))}>
                    {[...Array(item.countInStock).keys()].map(e =>
                      <option key={e + 1} value={e + 1}>{e + 1}</option>
                    )}
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Button type='button' variant='light' onClick={() => { dispatch(removeFromCart(item._id)) }}>
                    <i className='fas fa-trash'></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup>
          })
        )}
      </Col>
      <Col md={4}>
        <ListGroup>
          <ListGroup.Item>
            <h2>Subtotal ({items.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
            $ {items.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col className='text-center'>
                <Button type='submit' disabled={!items.length > 0 && true} onClick={checkOutHandler}>Proceed to checkout</Button>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  )
}

export default withRouterAndRedux(CartScreen);