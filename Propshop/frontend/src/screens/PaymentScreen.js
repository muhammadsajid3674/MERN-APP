import React, { useState } from 'react'
import { Col, Form, FormGroup } from 'react-bootstrap'
import CheckOutSteps from '../components/CheckOutSteps';
import FormContainer from '../components/FormContainer'
import LoadingButton from '../components/LoadingButton';
import { selectPaymentMethod } from '../config/Redux/Action/cartAction';
import { withRouterAndRedux } from '../config/util/withRouterAndRedux';

const PaymentScreen = ({ dispatch, navigate, state }) => {
    const { shippingAddress } = state.cart;
    const [selectedPaymentMethod, setPaymentMethod] = useState("Cash On Delivery")
    if (!shippingAddress) {
        navigate('/shipping')
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(selectPaymentMethod(selectedPaymentMethod));
        navigate('/placeorder');
    }
    return (
        <FormContainer>
            <CheckOutSteps signIn shipping payment />
            <h1>Shipping Address</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup className='mb-3'>
                    <Form.Label>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Credit or Debit Card'
                            name='paymentMethod'
                            id='card'
                            value='card'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <Form.Check
                            type='radio'
                            label='Cash On Delivery'
                            name='paymentMethod'
                            id='dob'
                            value='Cash On Delivery'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </Col>
                </FormGroup>
                <LoadingButton variant='primary' type='submit' label='Submit' />
            </Form>
        </FormContainer>
    )
}

export default withRouterAndRedux(PaymentScreen);