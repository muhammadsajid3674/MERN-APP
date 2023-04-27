import React, { useEffect, useState } from 'react'
import { Col, Form, FormGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer'
import LoadingButton from '../components/LoadingButton';
import MessageAlert from '../components/MessageAlert';
import { register } from '../config/Redux/Action/userAction';
import { withRouterAndRedux } from '../config/util/withRouterAndRedux';

const RegisterScreen = ({ dispatch, state, navigate }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const { loading, error, userRegister } = state.userRegister;

    const redirect = window.location.search ? window.location.search.split('=')[1] : '';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(register(name, email, password));
        }
    }
    useEffect(() => {
        if (userRegister) {
            navigate(`/${redirect}`);
        }
    }, [userRegister, navigate, redirect]);
    return (
        <FormContainer>
            <h1>Register</h1>

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
                {message && <MessageAlert variant='danger'>{message}</MessageAlert>}
                {error && <MessageAlert variant='danger' >{error}</MessageAlert>}
                <LoadingButton variant='primary' type='submit' label='Submit' isLoading={loading} />
            </Form>
            <Row className='py-3'>
                <Col>
                    Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Signin</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default withRouterAndRedux(RegisterScreen);