import React, { useState } from 'react'
import { Form, FormGroup } from 'react-bootstrap'
import CheckOutSteps from '../components/CheckOutSteps';
import FormContainer from '../components/FormContainer'
import LoadingButton from '../components/LoadingButton';
import { addShippingAddress } from '../config/Redux/Action/cart';
import { withRouterAndRedux } from '../config/util/withRouterAndRedux';

const ShippingScreen = ({ state: { cart: { shippingAddress } }, dispatch, navigate }) => {
    // Data Model
    const [address, setAddress] = useState(shippingAddress?.address);
    const [city, setCity] = useState(shippingAddress?.city);
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode);
    const [country, setCountry] = useState(shippingAddress?.country);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    }
    return (
        <FormContainer>
            <CheckOutSteps signIn shipping />
            <h1>Shipping Address</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup className='mb-3'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className='mb-3'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter City'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className='mb-3'>
                    <Form.Label>Postal</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Postal'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className='mb-3'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </FormGroup>
                <LoadingButton variant='primary' type='submit' label='Submit' />
            </Form>
        </FormContainer>
    )
}

export default withRouterAndRedux(ShippingScreen)