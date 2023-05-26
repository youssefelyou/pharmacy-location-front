import React from "react";
import Home from "../components/Home";
import {Navigate} from "react-router-dom";


const UserRoutes = [
    {
        path: "user",
        children: [
            {path: "home", element: <Home/>},
        ],
    },
    {path: "*", element: <Navigate to="/user/home"/>}
];

export default UserRoutes;