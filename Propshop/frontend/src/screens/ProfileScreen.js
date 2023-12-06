import React, { useEffect, useState } from 'react'
import { Col, Container, Form, FormGroup, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader';
import LoadingButton from '../components/LoadingButton';
import MessageAlert from '../components/MessageAlert';
import { myOrderList } from '../config/Redux/Action/orderAction';
import { getUserDetails, updateUserProfile } from '../config/Redux/Action/userAction';
import { actionType } from '../config/Redux/Constant/userConstant';
import { withRouterAndRedux } from '../config/util/withRouterAndRedux';

const ProfileScreen = ({ navigate, dispatch }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const { loading, error, user } = useSelector(state => state.userDetail);
    const { loading: loadingOrder, orders, error: errorOrder } = useSelector(state => state.myOrderList);
    const { success } = useSelector(state => state.userUpdateProfile);
    const { userInfo } = useSelector(state => state.userLogin);
    const handleSubmit = (e) => {
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ name, email, password }))
        }
        e.preventDefault()
    }
    useEffect(() => {
        if (!user) {
            dispatch({ type: actionType.USER_UPDATE_PROFILE_RESET })
            dispatch(getUserDetails())
            dispatch(myOrderList())
        } else {
            setName(user.name)
            setEmail(user.email)
        }
    }, [dispatch, user, navigate])
    return (
        <Container>
            <Row>
                <Col md={4}>
                    <h1>Update Profile</h1>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup className='mb-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
                        </FormGroup>
                        <FormGroup className='mb-3'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder='Enter email address' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup className='mb-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </FormGroup>
                        <FormGroup className='mb-3'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </FormGroup>
                        {message && <MessageAlert variant='danger' >{message}</MessageAlert>}
                        {success && <MessageAlert variant='success'>{success && 'User successfully updated'}</MessageAlert>}
                        {error && <MessageAlert variant='danger'>{error}</MessageAlert>}
                        <LoadingButton variant='primary' type='submit' label='Update' isLoading={loading} />
                    </Form>
                </Col>
                {loadingOrder ? (
                    <Col md={8} className='text-center align-self-center'>
                        <Loader />
                    </Col>

                ) : errorOrder ? (
                    <Col md={8} className='text-center align-self-center'>
                        <MessageAlert variant='danger'>{errorOrder}s</MessageAlert>
                    </Col>

                ) : (
                    <Col md={8}>
                        <h1>Orders List</h1>
                        {orders && orders.length > 0 ? (
                            <Table striped hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th>
                                        <th>DELIVERED</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders && orders.length > 0 && orders.map(item =>
                                        <tr key={item._id}>
                                            <td>{item._id}</td>
                                            <td>{item.createdAt.substring(0, 10)}</td>
                                            <td>$ {item.totalPrice}</td>
                                            <td>{item.isPaid ? item.paidAt.substring(0, 10) : <i className="fa fa-xmark text-danger"></i>}</td>
                                            <td>{item.isDelivered ? item.deliverAt.substring(0, 10) : <i className="fa fa-xmark text-danger"></i>}</td>
                                            <td>
                                                <button className='btn btn-primary' onClick={() => { navigate(`/order/${item._id}`) }}>Details</button>
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
            </Row>
        </Container>
    )
}

export default withRouterAndRedux(ProfileScreen)