// eslint-disable-next-line no-unused-vars
import React, {useEffect} from 'react';
import {useNavigate, useRoutes} from 'react-router-dom';
import {auth} from "../auth/auth";
import AdminRoute from "../auth/AdminRoute";
import UserRoute from "../auth/UserRoute";


const AuthGuard = ({children}) => {
    let user = auth.getUserFromLocalCache();
    const navigate = useNavigate();
    const adminRouting = useRoutes(AdminRoute);
    const userRouting = useRoutes(UserRoute);
    useEffect(() => {
        if (auth.isLogged()) {
            navigate("/login");
        }
    }, [adminRouting, userRouting, navigate]);


    if (user !== null && user?.role === 'ADMIN') {
        return (<div className="dark">
            {adminRouting}
        </div>);
    } else {
        return (<div className="dark">
            {userRouting}
        </div>);
    }
};

export default AuthGuard;


