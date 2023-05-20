import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card, CardBody, CardHeader, CardTitle} from "reactstrap";

const GardePharmacie = ({}) => {
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [gardeId, setGardeId] = useState("");
    const [garde, setGarde] = useState([]);
    const [pharmacieId, setPharmacieId] = useState("");
    const [pharmacie, setPharmacie] = useState([]);

    useEffect(() => {
        axios.get('/api/garde/').then((response) => {
            setGarde(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get(`/api/pharmacies/`).then((response) => {
            setPharmacie(response.data);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/pharmaciegarde/save', {
            dateDebut, dateFin, garde: {id: gardeId}, pharmacie: {id: pharmacieId}
        }).then((response) => {
            setDateDebut("");
            setDateFin("");
            setGardeId("");
            setPharmacieId("");

        });
    };

    return (
        <div className="container mt-3  p-5">
            <Card className="shadow-lg">
                <CardHeader className="d-flex bg-success   justify-content-between flex-row">
                    <CardTitle className="text-white">Add Garde Pharmacy</CardTitle>
                </CardHeader>


                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <div className="row">

                            <div className="col-lg-6 col-md-6 col-sm-12 p-3">
                                <label htmlFor="dateDebut" className="form-label">Date Debut:</label>
                                <input type="date" className="form-control" id="dateDebut" value={dateDebut}
                                       onChange={(event) => setDateDebut(event.target.value)}/>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 p-3">
                                <label htmlFor="dateDebut" className="form-label">Date Fin:</label>
                                <input type="date" className="form-control" id="dateDebut" value={dateFin}
                                       onChange={(event) => setDateFin(event.target.value)}/>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 p-3">
                                <label htmlFor="photo" className="form-label">select Garde</label>
                                <select className="form-control" id="gardeId" value={gardeId}
                                        onChange={(event) => setGardeId(event.target.value)}>
                                    <option value="">Select Garde</option>
                                    {garde && garde.map((garde) => (<option key={garde.id} value={garde.id}>
                                        {garde?.type}
                                    </option>))}
                                </select>
                            </div>


                            <div className="col-lg-6 col-md-6 col-sm-12 p-3">
                                <label htmlFor="pharmacieId" className="form-label">select Pharmacy</label>
                                <select className="form-control" id="gardeId" value={pharmacieId}
                                        onChange={(event) => setPharmacieId(event.target.value)}>
                                    <option value="">Select Pharmacy</option>
                                    {pharmacie && pharmacie.map((garde) => (<option key={pharmacie.id} value={pharmacie.id}>
                                        {pharmacie?.nom}
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

export default GardePharmacie;