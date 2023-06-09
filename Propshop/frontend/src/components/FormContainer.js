import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const FormContainer = ({ children }) => {
    return (
        <Container>
            <Row className='justify-content-center align-items-center' style={{ height: '75vh' }}>
                <Col md={6}>{children}</Col>
            </Row>
        </Container>
    )
}

export default FormContainer