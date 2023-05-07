import React, { useState, useEffect } from "react";
import axios from "axios";

const ZoneForm = ({ onZoneAdded }) => {
    const [name, setName] = useState("");
    const [cityId, setCityId] = useState("");
    const [cities, setCities] = useState([]);


    useEffect(() => {
        axios.get('/api/villes').then((response) => {
            setCities(response.data);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("/api/zones/save", {
            name,
            city: {
                id: cityId
            }
        }).then((response) => {
            //onZoneAdded(response.data);
            setName("");
            setCityId("");
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="cityId">City:</label>
                <select
                    className="form-control"
                    id="cityId"
                    value={cityId}
                    onChange={(event) => setCityId(event.target.value)}
                >
                    <option value="">Select a city </option>
                    {cities && cities.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">
                Add Zone
            </button>
        </form>
    );
};

export default ZoneForm;