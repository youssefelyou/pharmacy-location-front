import React, {useEffect, useState} from "react";
import {Card, CardBody, CardHeader, CardTitle, Table} from 'reactstrap'
import axios from "axios";
import {Link} from "react-router-dom";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
                                        <th>Id</th>
                                        <th>Nom</th>
                                        <th>Addresse</th>
                                        <th>Latitude</th>
                                        <th>Longitude</th>
                                        <th>Photo</th>
                                        <th>Zone</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {pharmacies.map((pharmacie) => (
                                        <tr key={pharmacie.id}>
                                            <td>{pharmacie.id}</td>
                                            <td>{pharmacie.nom}</td>
                                            <td>{pharmacie.addresse}</td>
                                            <td>{pharmacie.latitude}</td>
                                            <td>{pharmacie.longitude}</td>
                                            <td><img src={pharmacie.photo} alt={pharmacie.nom} width="100" height="100" /></td>
                                            <td>{pharmacie.zone && pharmacie.zone.nom}</td>
                                            <td>
                                                <FontAwesomeIcon icon={ faTrash} onClick={() => handleDelete(pharmacie.id)}/>
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
