import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
