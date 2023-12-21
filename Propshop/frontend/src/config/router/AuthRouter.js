import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const LoginScreen = lazy(() => import('../../screens/LoginScreen'));
const RegisterScreen = lazy(() => import('../../screens/RegisterScreen'));

export default function AuthRouter() {
    return (
        <Routes>
            <Route index element={<LoginScreen />} path="/login" />
            <Route element={<RegisterScreen />} path="/register" />
        </Routes>
    );
}
