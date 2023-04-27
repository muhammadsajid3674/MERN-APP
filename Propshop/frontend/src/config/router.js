import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from "../components/Footer";
import Header from "../components/Header";
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import OrderScreen from '../screens/OrderScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ShippingScreen from '../screens/ShippingScreen';
import UpdateUserScreen from '../screens/UpdateUserScreen';
import UserListScreen from '../screens/UserListScreen';

const AppRouter = () => {
    return (
        <Router>
            <Header />
            <main className='py-3'>
                <Container>
                    <Routes>
                        <Route path='/' element={<HomeScreen />} />
                        <Route path='/login' element={<LoginScreen />} />
                        <Route path='/register' element={<RegisterScreen />} />
                        <Route path='/profile' element={<ProfileScreen />} />
                        <Route path='/product/:id' element={<ProductDetailScreen />} />
                        <Route path='/cart/:id?' element={<CartScreen />} />
                        <Route path='/shipping' element={<ShippingScreen />} />
                        <Route path='/payment' element={<PaymentScreen />} />
                        <Route path='/placeorder' element={<OrderScreen />} />
                        <Route path='/order/:id' element={<OrderDetailScreen />} />
                        <Route path='/admin/usersList' element={<UserListScreen />} />
                        <Route path='/admin/productList' element={<ProductListScreen />} />
                        <Route path='/admin/user/:id/edit' element={<UpdateUserScreen />} />
                    </Routes>
                </Container>
            </main>
            <Footer />
        </Router>
    )
}

export default AppRouter