import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchSingleProduct } from '../config/Redux/Action/product'
import Loader from '../components/Loader'
import MessageAlert from '../components/MessageAlert'
import ProductDetail from '../components/ProductDetail'

const ProductDetailScreen = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const product = useSelector(state => state.products)
    const { loading, error } = useSelector(state => state.asyncHandler)

    useEffect(() => {
        dispatch(fetchSingleProduct(params.id))
    }, [params.id, dispatch])

    return (
        <>
            {loading ? (
                <div className='d-flex justify-content-center align-items-center' style={{ height: '60vh' }}>
                    <Loader />
                </div>
            ) : error ? (
                <MessageAlert variant='danger' message={error} />
            ) : (
                <>
                    <Button className='my-3' variant='light' type='button' onClick={() => { navigate('/') }}>Go Back</Button>
                    {product && <ProductDetail product={product} />}
                </>
            )}
        </>
    )
}

export default ProductDetailScreen