import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card, CardBody, CardHeader, CardTitle, Table} from "reactstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

const GardePharmacieList = () => {
    const [gardepharmacie, setGardeharmacies] = useState([]);


    useEffect(() => {
        const fetchpharmacie = async () => {
            const result = await axios(`/api/pharmaciegarde/`);
            setGardeharmacies(result.data);
        };
        fetchpharmacie();
    }, );



    return (
        <div>
            <div className="container bg-body mt-3 shadow-lg p-5">
                <div className="row">
                    <div className="col-md-12">
                        <Card>
                            <CardHeader className="d-flex bg-success justify-content-between flex-row">
                                <CardTitle className="text-white">Garde Pharmacie</CardTitle>

                                <Link to={`/pharmaciegarde-create`}>
                                    <a className="btn  btn-sm btn-outline-light">
                                        <FontAwesomeIcon icon={faPlus}/>
                                        New Garde Pharmacy
                                    </a>

                                </Link>

                            </CardHeader>


                            <CardBody>
                                <Table bordered>
                                    <thead>
                                    <tr>
                                        <th>Pharmacie</th>
                                        <th>Type de Garde</th>
                                        <th>Date de debut</th>
                                        <th>Date de Fin</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {gardepharmacie.map((gardepharmacie) => {
                                        const compositeKey = `${gardepharmacie.pk.pharmacie}-${gardepharmacie.pk.garde}`;

                                        return (
                                            <tr key={compositeKey}>
                                                <td>{gardepharmacie.pharmacie && gardepharmacie.pharmacie.nom}</td>
                                                <td>{gardepharmacie.garde && gardepharmacie.garde.type}</td>
                                                <td>{new Date(gardepharmacie.pk.dateDebut).toLocaleDateString()}</td>
                                                <td>{new Date(gardepharmacie.dateFin).toLocaleDateString()}</td>
                                                <td></td>
                                            </tr>
                                        );
                                    })}
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

export default GardePharmacieList;