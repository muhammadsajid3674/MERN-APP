import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    if (window.localStorage.getItem('access_token')) {
        return <Navigate to="/" replace />;
    } else return <>{children}</>;
};

export default PublicRoute;
