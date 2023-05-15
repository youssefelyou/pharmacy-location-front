import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card, CardBody, CardHeader, CardTitle} from "reactstrap";

const PharmacyForm = ({}) => {
    const [nom, setNom] = useState('');
    const [addresse, setAddresse] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [photo, setPhoto] = useState('');
    const [zoneId, setZoneId] = useState("");
    const [zone, setZone] = useState([]);

    useEffect(() => {
        axios.get('/api/zones').then((response) => {
            setZone(response.data);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/pharmacies/save', {
            nom, addresse, latitude, longitude, photo, zone: {
                id: zoneId
            }
        }).then((response) => {
            setNom("");
            setAddresse("");
            setLatitude("");
            setLongitude("");
            setPhoto("");
            setZoneId("");
        });
    };
    return (
        <div className="container mt-3  p-5">
            <Card className="shadow-lg">
                <CardHeader className="d-flex bg-success   justify-content-between flex-row">
                    <CardTitle className="text-white">create pharmacy</CardTitle>
                </CardHeader>


                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <div className="row">

                            <div className="col-lg-6 col-md-6 col-sm-12 p-3">
                                <label htmlFor="nom" className="form-label">Nom:</label>
                                <input type="text" className="form-control" id="nom" value={nom}
                                       onChange={(event) => setNom(event.target.value)}/>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 p-3">
                                <label htmlFor="addresse" className="form-label">Addresse:</label>
                                <input type="text" className="form-control" id="addresse" value={addresse}
                                       onChange={(event) => setAddresse(event.target.value)}/>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 p-3">
                                <label htmlFor="latitude" className="form-label">Latitude:</label>
                                <input type="number" step="any" className="form-control" id="latitude" value={latitude}
                                       onChange={(event) => setLatitude(parseFloat(event.target.value))}/>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 p-3">
                                <label htmlFor="longitude" className="form-label">Longitude:</label>
                                <input type="number" step="any" className="form-control" id="longitude"
                                       value={longitude}
                                       onChange={(event) => setLongitude(parseFloat(event.target.value))}/>
                            </div>


                            <div className="col-lg-6 col-md-6 col-sm-12 p-3">
                                <label htmlFor="photo" className="form-label">Photo:</label>
                                <input type="text" className="form-control" id="photo" value={photo}
                                       onChange={(event) => setPhoto(event.target.value)}/>
                            </div>


                            <div className="col-lg-6 col-md-6 col-sm-12 p-3">
                                <label htmlFor="photo" className="form-label">select zone</label>
                                <select className="form-control" id="zoneId" value={zoneId}
                                        onChange={(event) => setZoneId(event.target.value)}>
                                    <option value="">Select zone</option>
                                    {zone && zone.map((zone) => (<option key={zone.id} value={zone.id}>
                                        {zone?.nom}
                                    </option>))}
                                </select>
                            </div>


                        </div>
                        <div className="row">
                            <div className="col-md-4 col-sm-12"></div>
                            <div className="col-md-4 col-sm-12">
                                <button type="submit" className="btn w-100  btn-outline-success">Submit</button>
                            </div>
                            <div className="col-md-4 col-sm-12"></div>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}

export default PharmacyForm;