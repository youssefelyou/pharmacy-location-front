import React, {useEffect, useState} from "react";
import { Card, CardBody, CardHeader, CardTitle, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from "axios";
import {Link} from "react-router-dom";
import { faPlus, faTrash, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import QRCode from "qrcode.react";

const PharmacyList = ({ zoneId }) => {
    const [pharmacies, setPharmacies] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [updatedPharmacy, setUpdatedPharmacy] = useState({
        id: null,
        nom: '',
        addresse: '',
        latitude: '',
        longitude: '',
        photo: '',
        zone: '',
    });


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

    const openUpdateModal = (pharmacie) => {
        setUpdatedPharmacy({
            id: pharmacie.id,
            nom: pharmacie.nom,
            addresse: pharmacie.addresse,
            latitude: pharmacie.latitude,
            longitude: pharmacie.longitude,
            photo: pharmacie.photo,
            zone: pharmacie.zone.nom,
        });
        setIsOpen(true);
    };

    const handleUpdate = () => {
        axios.put(`/api/pharmacies/${updatedPharmacy.id}`, updatedPharmacy)
            .then(() => {
                setPharmacies(pharmacies => pharmacies.map(pharmacie => {
                    if (pharmacie.id === updatedPharmacy.id) {
                        return updatedPharmacy;
                    }
                    return pharmacie;
                }));

                setIsOpen(false);
            })
            .catch(error => {
                console.error("Error updating pharmacy:", error);

            });
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setUpdatedPharmacy({ ...updatedPharmacy, photo: e.target.result });
        };
        reader.readAsDataURL(file);
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
                                                <button onClick={() => openUpdateModal(pharmacie)}>Update</button>
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
            <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
                <ModalHeader toggle={() => setIsOpen(!isOpen)}>Update Pharmacy</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="nom">Nom</Label>
                            <Input
                                type="text"
                                name="nom"
                                id="nom"
                                value={updatedPharmacy.nom}
                                onChange={(e) => setUpdatedPharmacy({ ...updatedPharmacy, nom: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="addresse">Adresse</Label>
                            <Input
                                type="text"
                                name="addresse"
                                id="addresse"
                                value={updatedPharmacy.addresse}
                                onChange={(e) => setUpdatedPharmacy({ ...updatedPharmacy, addresse: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="latitude">Latitude</Label>
                            <Input
                                type="text"
                                name="latitude"
                                id="latitude"
                                value={updatedPharmacy.latitude}
                                onChange={(e) => setUpdatedPharmacy({ ...updatedPharmacy, latitude: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="longitude">Longitude</Label>
                            <Input
                                type="text"
                                name="longitude"
                                id="longitude"
                                value={updatedPharmacy.longitude}
                                onChange={(e) => setUpdatedPharmacy({ ...updatedPharmacy, longitude: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="photo">Photo</Label>
                            <input type="file" className="form-control" accept="image/*" id="photo"
                                   onChange={handlePhotoChange}/>
                        </FormGroup>
                        {/*<FormGroup>*/}
                        {/*    <Label for="zone">Zone</Label>*/}
                        {/*    <select className="form-control" id="zoneId" value={zoneId}*/}
                        {/*            onChange={(event) => setUpdatedPharmacy({ ...updatedPharmacy, zone: e.target.value })}>*/}
                        {/*        <option value="">Select zone</option>*/}
                        {/*        {zone && zone.map((zone) => (<option key={zone.id} value={zone.id}>*/}
                        {/*            {zone?.nom}*/}
                        {/*        </option>))}*/}
                        {/*    </select>*/}
                        {/*</FormGroup>*/}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleUpdate}>Update</Button>
                    <Button color="secondary" onClick={() => setIsOpen(!isOpen)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default PharmacyList;
