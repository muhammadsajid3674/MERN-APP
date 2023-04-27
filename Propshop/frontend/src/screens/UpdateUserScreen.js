import React, { useEffect, useState } from 'react'
import { Col, Container, Form, FormGroup, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingButton from '../components/LoadingButton';
import { UpdateUser } from '../config/Redux/Action/userAction';
import { withRouterAndRedux } from '../config/util/withRouterAndRedux';

const UpdateUserScreen = ({ dispatch, params }) => {
    const navigate = useNavigate();
    const { state: { data } } = useLocation();

    const [name, setName] = useState(data.name);
    const [email, setEmail] = useState(data.email);
    const [isAdmin, setAdmin] = useState(data.isAdmin);

    const handleSubmit = (e) => {
        dispatch(UpdateUser(params.id, { email, name, isAdmin }))
        navigate('/admin/usersList')
        e.preventDefault()
    }
    return (
        <Container>
            <Row className='justify-content-center align-items-center' style={{ height: '75vh' }}>
                <Col md={4}>
                    <h1>Update User</h1>
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
                            <Form.Check label="Is Admin" name="isAdmin" type="checkbox" checked={isAdmin} onChange={(e) => setAdmin(e.target.checked)} />
                        </FormGroup>
                        {/* {success && <MessageAlert variant='success'>{success && 'User successfully updated'}</MessageAlert>} */}
                        {/* {error && <MessageAlert variant='danger'>{error}</MessageAlert>} */}
                        <LoadingButton variant='primary' type='submit' label='Update' />
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default withRouterAndRedux(UpdateUserScreen)