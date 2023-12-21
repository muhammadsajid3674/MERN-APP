import { useRoutes } from "react-router-dom";
import { lazy } from "react";

const HomeScreen = lazy(() => import('../../screens/HomeScreen'));
const CartScreen = lazy(() => import('../../screens/CartScreen'));
const OrderDetailScreen = lazy(() => import('../../screens/OrderDetailScreen'));
const OrderScreen = lazy(() => import('../../screens/OrderScreen'));
const PaymentScreen = lazy(() => import('../../screens/PaymentScreen'));
const ProductDetailScreen = lazy(() => import('../../screens/ProductDetailScreen'));
const ProductListScreen = lazy(() => import('../../screens/ProductListScreen'));
const ProfileScreen = lazy(() => import('../../screens/ProfileScreen'));
const ShippingScreen = lazy(() => import('../../screens/ShippingScreen'));
const UserListScreen = lazy(() => import('../../screens/UserListScreen'));
const UpdateUserScreen = lazy(() => import('../../screens/UpdateUserScreen'));
const LoginScreen = lazy(() => import('../../screens/LoginScreen'));
const RegisterScreen = lazy(() => import('../../screens/RegisterScreen'));

export default function AppRouter() {
    let element = useRoutes([
        {
            path: '/login',
            element: <LoginScreen />
        },
        {
            path: '/register',
            element: <RegisterScreen />
        },
        {
            path: '/',
            element: <HomeScreen />
        },
        {
            path: '/profile',
            element: <ProfileScreen />
        },
        {
            path: '/product/:id',
            element: <ProductDetailScreen />
        },
        {
            path: '/cart/:id?',
            element: <CartScreen />
        },
        {
            path: '/shipping',
            element: <ShippingScreen />
        },
        {
            path: '/payment',
            element: <PaymentScreen />
        },
        {
            path: '/place-order',
            element: <OrderScreen />
        },
        {
            path: '/order/:id',
            element: <OrderDetailScreen />
        },
        {
            path: '/admin/usersList',
            element: <UserListScreen />
        },
        {
            path: '/admin/productList',
            element: <ProductListScreen />
        },
        {
            path: '/admin/user/:id/edit',
            element: <UpdateUserScreen />
        },
    ])
    return element;
}