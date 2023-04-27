import React, { useEffect } from 'react'
import { Col, Stack, Table } from 'react-bootstrap';
import Loader from '../components/Loader';
import MessageAlert from '../components/MessageAlert';
import { deleteProduct, fetchProductList } from '../config/Redux/Action/productAction';
import { withRouterAndRedux } from '../config/util/withRouterAndRedux'

const ProductListScreen = ({ dispatch, state }) => {
    const { productList: { loading, error, products }, deleteProduct: { success: successDelete } } = state;
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }
    useEffect(() => {
        dispatch(fetchProductList())
    }, [dispatch, successDelete])

    return (
        <>
            {loading ? (
                <Col md={12}>
                    <div className='d-flex justify-content-center align-items-center' style={{ height: '60vh' }}>
                        <Loader />
                    </div>
                </Col>
            ) : error ? (
                <Col md={12} className='text-center align-self-center'>
                    <MessageAlert variant='danger'>{error}</MessageAlert>
                </Col>
            ) : (
                <Col md={12}>
                    <Stack direction='horizontal'>
                        <h1 className='flex-grow-1'>Products</h1>
                        <button className='btn btn-primary' type='button'>&#43; Create Project</button>
                    </Stack>
                    {products && products.length > 0 ? (
                        <Table striped hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.length > 0 && products.map(e =>
                                    <tr key={e._id}>
                                        <td>{e._id}</td>
                                        <td>{e.name}</td>
                                        <td>$ {e.price}</td>
                                        <td>{e.category}</td>
                                        <td>{e.brand}</td>
                                        <td>
                                            <Stack direction='horizontal' gap={3}>
                                                <button className='btn btn-success' onClick={() => { }}><i className="fa fa-pen-to-square"></i></button>
                                                <button className='btn btn-danger' onClick={() => deleteProductHandler(e._id)}><i className="fa fa-trash"></i></button>
                                            </Stack>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    ) : (
                        <p className='text-center'>No Order Found</p>
                    )}
                </Col>
            )}
        </>
    )
}

export default withRouterAndRedux(ProductListScreen)