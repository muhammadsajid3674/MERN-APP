import React, { useState } from 'react'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Rating from './Rating'

const ProductDetail = ({ product }) => {
    const [qty, setQty] = useState(1)

    const navigate = useNavigate();

    let productImage;
    if (product.image) {
        productImage = require(`../${product.image}`)
    }

    const qtyArray = [...Array(product.countInStock).keys()]

    const addToCardHandler = () => {
        navigate(`/cart/${product._id}?qty=${qty}`)
    }

    return (
        <Row>
            <Col md={6}>
                <Image src={productImage} alt={product.name} fluid />
            </Col>
            <Col md={3}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating rating={product.rating} text={`${product.numReviews} reviews`} />
                    </ListGroup.Item>
                    <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                    <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <ListGroup>
                    <ListGroup.Item>
                        <Row>
                            <Col>Price:</Col>
                            <Col>$ {product.price}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Status:</Col>
                            <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of stock'}</Col>
                        </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && <>
                        <ListGroup.Item>
                            <Row>
                                <Col>Quantity:</Col>
                                <Col>
                                    <Form.Select value={qty} onChange={(e) => setQty(e.target.value)}>
                                        {qtyArray && qtyArray.map((e, i) =>
                                            <option key={i} value={e + 1}>{e + 1}</option>
                                        )}
                                    </Form.Select>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </>}
                    <ListGroup.Item>
                        <Row>
                            <Col className='text-center'>
                                <Button type='submit' onClick={addToCardHandler} disabled={product.countInStock === 0}>Add To Card</Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    )
}

export default ProductDetail