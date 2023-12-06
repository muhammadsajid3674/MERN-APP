import React, { Fragment } from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import AppRouter from './config/router/AppRouter'

const PropshopApp = () => {
    console.log('prop :>> ');
    return (
        <Fragment>
            <Header />
            <main className='py-3'>
                <Container>
                    <AppRouter />
                </Container>
            </main>
            <Footer />
        </Fragment>
    )
}

export default PropshopApp