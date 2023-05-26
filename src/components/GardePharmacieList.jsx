import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card, CardBody, CardHeader, CardTitle, Table} from "reactstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Header} from "./Layout";

const GardePharmacieList = () => {
    const [gardepharmacie, setGardeharmacies] = useState([]);
    const [pharmacies, setPharmacies] = useState([]);
    const [gardes, setGardes] = useState([]);

    useEffect(() => {
        const fetchpharmacie = async () => {
            const result = await axios(`/api/pharmacies/`);
            setPharmacies(result.data);
        };
        fetchpharmacie();
    }, );

    useEffect(() => {
        const fetchgarde = async () => {
            const result = await axios(`/api/garde/`);
            setGardes(result.data);
        };
        fetchgarde();
    }, );

    useEffect(() => {
        const fetchpharmaciegarde = async () => {
            const result = await axios(`/api/pharmaciegarde/`);
            setGardeharmacies(result.data);
        };
        fetchpharmaciegarde();
    }, );

    const handledelete = async (dateDebut, idPharmacie, idGarde) => {
        try {
            await axios.delete(`/api/pharmaciegarde/${dateDebut}/idpharmacie/${idPharmacie}/idgarde/${idGarde}`);
            console.log('Pharmacie garde deleted successfully');
        } catch (error) {
            console.error('Error deleting pharmacie garde:', error);
        }
    };


    return (
        <div>
            <Header/>
            <div className="main-wrapper">
        <div>
            <div className="container bg-body mt-3 shadow-lg p-5">
                <div className="row">
                    <div className="col-md-12">
                        <Card>
                            <CardHeader className="d-flex bg-success justify-content-between flex-row">
                                <CardTitle className="text-white">Garde Pharmacie</CardTitle>

                                <Link to={`/admin/pharmaciegarde-create`}>
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
                                        return (
                                            <tr key={gardepharmacie.pk.dateDebut + gardepharmacie.pk.pharmacie + gardepharmacie.pk.garde}>
                                                <td>{pharmacies.find((pharmacie) => pharmacie.id === gardepharmacie.pk.pharmacie)?.nom}</td>
                                                <td>{gardes.find((garde) => garde.id === gardepharmacie.pk.garde)?.type}</td>
                                                <td>{new Date(gardepharmacie.pk.dateDebut).toLocaleDateString()}</td>
                                                <td>{new Date(gardepharmacie.dateFin).toLocaleDateString()}</td>
                                                <td> <button><FontAwesomeIcon icon={ faTrash} onClick={() => handledelete(gardepharmacie.pk.dateDebut,gardepharmacie.pk.pharmacie,gardepharmacie.pk.garde)}/></button></td>
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
            </div>
        </div>
    );
        };

export default GardePharmacieList;