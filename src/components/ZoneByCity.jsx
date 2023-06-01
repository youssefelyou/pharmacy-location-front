import React, {useEffect, useState} from "react";
import axios from "axios";
import {Header} from "./Layout";

const ZoneByville = () => {
    const [zones, setZones] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedvilleId, setSelectedvilleId] = useState("");

    useEffect(() => {
        axios.get('https://pharmacy-location.up.railway.app/api/villes/').then((response) => {
            setCities(response.data);
        });
    }, []);

    const handlevilleChange = (event) => {
        const villeId = event.target.value;
        setSelectedvilleId(villeId);
        axios.get('https://pharmacy-location.up.railway.app/api/zones/ville/${villeId}').then((response) => {
            setZones(response.data);
        });
    };

    return (
        <div>
            <Header/>
            <div className="main-wrapper">
        <div className="container bg-body mt-3 shadow-lg p-5">

            <div className="d-flex justify-content-between flex-row">
                <h2>Zone par ville</h2>
                <div className="form-group d-flex  flex-row ">
                    <label className="w-100 m-2" htmlFor="villeId">Select a city: </label>
                    <select
                        className="form-select-sm"
                        id="villeId"
                        value={selectedvilleId}
                        onChange={handlevilleChange}
                    >
                        <option value="">All cities</option>
                        {cities.map((ville) => (
                            <option key={ville.id} value={ville.id}>
                                {ville?.nom}
                            </option>
                        ))}
                    </select>
                </div>
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
                        <td>{zone.nom}</td>
                        <td>{zone.ville?.nom}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
            </div>
        </div>
    );
};

export default ZoneByville;
