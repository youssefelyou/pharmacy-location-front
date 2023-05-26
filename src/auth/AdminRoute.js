import CityList from "../components/CityList";
import CityForm from "../components/CityForm";
import ZoneList from "../components/ZoneList";
import ZoneForm from "../components/ZoneForm";
import ZoneByCity from "../components/ZoneByCity";
import PharmacyList from "../components/PharmacyList";
import PharmacyForm from "../components/PharmacyForm";
import GardePharmacieList from "../components/GardePharmacieList";
import GardePharmacie from "../components/GardePharmacie";
import React from "react";
import Home from "../components/Home";
import {Navigate} from "react-router-dom";


const AdminRoute = [
    {
        path: "admin",
        children: [
            {path: "home", element: <Home/>},
            {path: "city-list", element: <CityList/>},
            {path: "create-city", element: <CityForm/>},
            {path: "zone", element: <ZoneList/>},
            {path: "create-zone", element: <ZoneForm/>},
            {path: "zoneByCity", element: <ZoneByCity/>},
            {path: "pharmacie", element: <PharmacyList/>},
            {path: "pharmacie-create", element: <PharmacyForm/>},
            {path: "pharmaciegarde", element: <GardePharmacieList/>},
            {path: "pharmaciegarde-create", element: <GardePharmacie/>}
        ],
    },
    {path: "*", element: <Navigate to="/admin/home"/>}
];

export default AdminRoute