import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {Header} from "./Layout";

const CityList = () => {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        axios.get('/api/villes/').then((response) => {
            setCities(response.data);
        });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this city?")) {
            axios.delete(`/api/villes/delete/${id}`).then(() => {
                setCities(cities.filter((city) => city.id !== id));
            });
        }
    };

    const handleEdit = (id) => {
        const newName = window.prompt("Enter the new name for this city:");
        if (newName) {
            axios.put(`/api/villes/${id}`, {nom: newName}).then(() => {
                setCities(cities.map((city) => {
                    if (city.id === id) {
                        return {...city, nom: newName};
                    }
                    return city;
                }));
            });
        }
    };

    return (
        <div>
            <Header/>
            <div className="main-wrapper">
                <div className="container bg-body mt-3 shadow-lg p-5">
        <div className="d-flex justify-content-between flex-row">
            <h2>Cities</h2>
            <Link to="/admin/create-city">
                <a className="btn text-center btn-sm btn-outline-success">new city</a>

            </Link>
        </div>


        <table className="table rounded p-3 table-light table-hover">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {cities.map((city) => (<tr key={city.id}>
                <td>{city.id}</td>
                <td>{city.nom}</td>
                <td>
                    <button className="btn btn-sm btn-outline-danger m-2" onClick={() => handleDelete(city.id)}>
                        Delete
                    </button>
                    <button className="btn btn-sm btn-outline-warning " onClick={() => handleEdit(city.id)}>
                        Edit
                    </button>
                </td>
            </tr>))}
            </tbody>
        </table>
                </div>
            </div>
    </div>);
};

export default CityList;
