import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card, CardBody, CardHeader, CardTitle} from "reactstrap";
import {Header} from "./Layout";

const ZoneForm = ({onZoneAdded}) => {
    const [nom, setName] = useState("");
    const [villeId, setvilleId] = useState("");
    const [ville, setville] = useState([]);


    useEffect(() => {
        axios.get('https://pharmacy-location.up.railway.app/api/villes/').then((response) => {
            setville(response.data);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://pharmacy-location.up.railway.app/api/zones/save', {
            nom,
            ville: {
                id: villeId
            }
        }).then((response) => {
            setName("");
            setvilleId("");
        });
    };

    return (
        <div>
            <Header/>
            <div className="main-wrapper">
        <div className="container mt-3  p-5">
            <Card className="shadow-lg">
                <CardHeader className="d-flex bg-success   justify-content-between flex-row">
                    <CardTitle className="text-white">create zone</CardTitle>
                </CardHeader>

                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12 p-3">
                                <label htmlFor="nom" className="form-label">Name:</label>
                                <input type="text" className="form-control" id="nom" value={nom}
                                       onChange={(e) => {
                                           const inputValue = e.target.value;
                                           const onlyLetters = inputValue.replace(/[^A-Za-z]/g, "");
                                           setName(onlyLetters);
                                       }}/>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 p-3">
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
                        </div>

                        <div className="row">
                            <div className="col-md-4 col-sm-12"></div>
                            <div className="col-md-4 col-sm-12">
                                <button type="submit" className="btn w-100  btn-outline-success">Add Zone</button>
                            </div>
                            <div className="col-md-4 col-sm-12"></div>
                        </div>

                    </form>
                </CardBody>
            </Card>
        </div>
            </div>
        </div>

    );
};

export default ZoneForm;