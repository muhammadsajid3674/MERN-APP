import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    if (window.localStorage.getItem('access_token')) {
        return <>{children}</>
    }
    return <Navigate to="/" replace />;
};

export default PrivateRoute;
