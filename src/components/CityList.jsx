import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
            axios.put(`/api/villes/${id}`, {nom:newName }).then(() => {
                setCities(cities.map((city) => {
                    if (city.id === id) {
                        return { ...city, nom: newName };
                    }
                    return city;
                }));
            });
        }
    };

    return (
        <div>
            <h2>City List</h2>
            <Link to="/create-city" className="btn btn-primary">
                Create City
            </Link>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {cities.map((city) => (
                    <tr key={city.id}>
                        <td>{city.id}</td>
                        <td>{city.nom}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleDelete(city.id)}>
                                Delete
                            </button>
                            <button className="btn btn-secondary ml-2" onClick={() => handleEdit(city.id)}>
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
};

export default CityList;
