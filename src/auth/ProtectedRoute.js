import {Navigate, useNavigate} from "react-router-dom";
import {auth} from "./auth";
import AdminRoute from "./AdminRoute";

const ProtectedRoute = ({children}) => {
    console.log(children)
    if (!auth.isLogged()) {
        return AdminRoute
    } else {
        return AdminRoute
    }
};

export default ProtectedRoute;
