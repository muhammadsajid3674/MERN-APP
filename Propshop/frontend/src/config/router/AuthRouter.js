import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';

// const LoginScreen = lazy(() => import('../../screens/LoginScreen'));
// const RegisterScreen = lazy(() => import('../../screens/RegisterScreen'));

export default function AuthRouter() {
    return (
        <Routes>
            <Route element={<LoginScreen />} path="/" />
            <Route element={<RegisterScreen />} path="/register" />
        </Routes>
    );
}
