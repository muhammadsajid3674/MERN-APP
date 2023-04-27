import React, { useEffect, useState } from 'react'
import { Col, Form, FormGroup, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer'
import LoadingButton from '../components/LoadingButton';
import MessageAlert from '../components/MessageAlert';
import { login } from '../config/Redux/Action/userAction';
import { withRouterAndRedux } from '../config/util/withRouterAndRedux';

const LoginScreen = ({ dispatch, state }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { loading, error, userInfo } = state.userLogin;
    const redirect = window.location.search ? window.location.search.split('=')[1] : '';

    const handleSubmit = (e) => {
        dispatch(login(email, password))
        e.preventDefault()
    };

    useEffect(() => {
        if (userInfo) {
            navigate(`/${redirect}`);
        }
    }, [userInfo, navigate, redirect])
    return (
        <FormContainer>
            <h1>Sign in</h1>

            <Form onSubmit={handleSubmit}>
                <FormGroup className='mb-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email address' value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormGroup>
                {error && <MessageAlert variant='danger'>{error}</MessageAlert>}
                <LoadingButton variant='primary' type='submit' label='Submit' isLoading={loading} />
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customers? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default withRouterAndRedux(LoginScreen);