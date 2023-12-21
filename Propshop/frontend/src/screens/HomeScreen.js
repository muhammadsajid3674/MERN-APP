import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductList } from '../config/Redux/Action/product'
import MessageAlert from '../components/MessageAlert'
import Loader from '../components/Loader'

const HomeScreen = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products)
    const { loading, elementName } = useSelector(state => state.asyncHandler)

    useEffect(() => {
        dispatch(fetchProductList())
    }, [dispatch])

    return (
        <>
            <h1 className='mt-3'>Latest Product</h1>
            {loading && elementName === 'product' ? (
                <div className='d-flex justify-content-center align-items-center' style={{ height: '60vh' }}>
                    <Loader />
                </div>
            // ) : error ? (
            //     <MessageAlert variant='danger' message={error.message} />
            ) : (
                <Row>
                    {products?.length > 0 && products?.map(e =>
                        <Col xl={3} lg={4} md={6} sm={12} key={e._id}>
                            <Product products={e} />
                        </Col>
                    )}
                </Row>
            )}
        </>
    )
}

export default HomeScreen