import React, { useState, useEffect } from "react";
import axios from "axios";

const ZoneForm = ({ onZoneAdded }) => {
    const [nom, setName] = useState("");
    const [villeId, setvilleId] = useState("");
    const [ville, setville] = useState([]);


    useEffect(() => {
        axios.get('/api/villes/').then((response) => {
            setville(response.data);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/zones/save', {
            nom,
            ville: {
                id: villeId
            }
        }).then((response) => {
            //onZoneAdded(response.data);
            setName("");
            setvilleId("");
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="nom" className="form-label">Name:</label>
                <input type="text" className="form-control" id="nom" value={nom}
                       onChange={(event) => setName(event.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="villeId" className="form-label">ville:</label>
                <select className="form-control" id="villeId" value={villeId}
                        onChange={(event) => setvilleId(event.target.value)}>
                    <option value="">Select city</option>
                    {ville && ville.map((ville) => (
                        <option key={ville.id} value={ville.id}>
                            {ville?.nom}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Add Zone</button>
        </form>

    );
};

export default ZoneForm;