import React from 'react'
import { Nav } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const CheckOutSteps = ({ signIn, shipping, payment, orderPlace }) => {
    const navigate = useNavigate();
    return (
        <Nav className='justify-content-center mb-4'>
            {signIn ?
                <Nav.Link onClick={() => { navigate('/logIn') }}>Sign In</Nav.Link>
                :
                <Nav.Link disabled>Sign In</Nav.Link>
            }
            {shipping ?
                <Nav.Link onClick={() => { navigate('/shipping') }}>Shipping</Nav.Link>
                :
                <Nav.Link disabled>Shipping</Nav.Link>
            }
            {payment ?
                <Nav.Link onClick={() => { navigate('/payment') }}>Payment</Nav.Link>
                :
                <Nav.Link disabled>Payment</Nav.Link>
            }
            {orderPlace ? <Nav.Link onClick={() => { navigate('/orderPlace') }}>Order Place</Nav.Link> : <Nav.Link disabled>Order Place</Nav.Link>}
        </Nav>
    )
}

export default CheckOutSteps;