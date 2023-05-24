import React, {useEffect, useState} from "react";
import {Card, CardBody, CardHeader, CardTitle, Table} from 'reactstrap'
import axios from "axios";
import {Link} from "react-router-dom";
import { faPlus, faTrash, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import QRCode from "qrcode.react";

const PharmacyList = ({zoneId}) => {
    const [pharmacies, setPharmacies] = useState([]);


    useEffect(() => {
        const fetchpharmacie = async () => {
            const result = await axios(`/api/pharmacies/`);
            setPharmacies(result.data);
        };
        fetchpharmacie();
    }, [zoneId]);



    const handleDelete = (pharmacieId) => {
        if (window.confirm("Are you sure you want to delete this pharmacie?")) {
            axios.delete(`/api/pharmacies/delete/${pharmacieId}`).then(() => {
                setPharmacies(pharmacies.filter((pharmacie) => pharmacie.id !== pharmacieId));
            });
        }
    };

    const handleLocation = (latitude, longitude) => {
        // Open a new tab or window with the location based on the latitude and longitude
        window.open(`https://maps.google.com/maps?q=${latitude},${longitude}`);
    };

    return (
        <div>
            <div className="container bg-body mt-3 shadow-lg p-5">
                <div className="row">
                    <div className="col-md-12">
                        <Card>
                            <CardHeader className="d-flex bg-success justify-content-between flex-row">
                                <CardTitle className="text-white">Pharmacies</CardTitle>

                                <Link to={`/pharmacie-create`}>
                                    <a className="btn  btn-sm btn-outline-light">
                                        <FontAwesomeIcon icon={faPlus}/>
                                        New Pharmacy
                                    </a>

                                </Link>

                            </CardHeader>


                            <CardBody>
                                <Table bordered>
                                    <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Addresse</th>
                                        <th>Latitude</th>
                                        <th>Longitude</th>
                                        <th>Photo</th>
                                        <th>Zone</th>
                                        <th>Code QR</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {pharmacies.map((pharmacie) => (
                                        <tr key={pharmacie.id}>
                                            <td>{pharmacie.nom}</td>
                                            <td>{pharmacie.addresse}</td>
                                            <td>{pharmacie.latitude}</td>
                                            <td>{pharmacie.longitude}</td>
                                            <td><img src={pharmacie.photo} alt={pharmacie.nom} width="100" height="100" /></td>
                                            <td>{pharmacie.zone && pharmacie.zone.nom}</td>
                                            <td><QRCode
                                                value={`Id: ${pharmacie?.id}\n Nom: ${pharmacie?.nom}\n Adresse: ${pharmacie?.addresse}\n zone: ${pharmacie?.zone.nom}\n localisation:https://maps.google.com/maps?q=${pharmacie.latitude},${pharmacie.longitude}`}
                                                size={50}/>
                                            </td>
                                            <td>
                                                <FontAwesomeIcon icon={ faTrash} onClick={() => handleDelete(pharmacie.id)}/>
                                                <button onClick={() => handleLocation(pharmacie.latitude, pharmacie.longitude)}>
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PharmacyList;
