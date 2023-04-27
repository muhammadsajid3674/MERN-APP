import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ products }) => {
    const productImage = require(`../${products.image}`)
    return (
        <Card className='my-3 p-3'>
            <Link to={`/product/${products._id}`}>
                <Card.Img src={productImage} />
            </Link>
            <Card.Body>
                <Link to={`/product/${products._id}`}>
                    <Card.Title as='div'>
                        <strong>{products.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating rating={products.rating} text={`${products.numReviews} reviews`} />
                </Card.Text>
                <Card.Text as='h3'>${products.price}</Card.Text>
            </Card.Body>
        </Card >
    )
}

export default Product