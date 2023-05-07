import React, { useState, useEffect } from "react";
import axios from "axios";

const ZoneByCity = () => {
    const [zones, setZones] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCityId, setSelectedCityId] = useState("");

    useEffect(() => {
        axios.get("/api/villes").then((response) => {
            setCities(response.data);
        });
    }, []);

    const handleCityChange = (event) => {
        const cityId = event.target.value;
        setSelectedCityId(cityId);
        axios.get(`/api/zones/ville/${cityId}`).then((response) => {
            setZones(response.data);
        });
    };

    return (
        <div>
            <h2>Zone par ville</h2>
            <div className="form-group">
                <label htmlFor="cityId">Select a city:</label>
                <select
                    className="form-control"
                    id="cityId"
                    value={selectedCityId}
                    onChange={handleCityChange}
                >
                    <option value="">All cities</option>
                    {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </select>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>City</th>
                </tr>
                </thead>
                <tbody>
                {zones.map((zone) => (
                    <tr key={zone.id}>
                        <td>{zone.name}</td>
                        <td>{zone.city.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ZoneByCity;
