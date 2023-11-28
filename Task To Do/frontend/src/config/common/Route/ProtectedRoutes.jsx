import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    let token = window.localStorage.getItem('token');
    if (token) {
        return <Outlet />
    } else {
        return <Navigate to={"/"} replace />
    }
}

export default ProtectedRoutes