import React, {useEffect, useState} from "react";
import { Card, CardBody, CardHeader, CardTitle, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from "axios";
import {Link} from "react-router-dom";
import { faPlus, faTrash, faMapMarkerAlt,faEdit } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import QRCode from "qrcode.react";
import {Header} from "./Layout";
import {Dialog} from "@mui/material";

const PharmacyList = ({ zoneId }) => {
    const [pharmacies, setPharmacies] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [pharmacienom, setPharmacieNom] = useState('');
    const [pharmacielatitude, setPharmacieLatitude] = useState('');
    const [pharmacielongitude, setPharmacieLongitude] = useState('');
    const [pharmacieAdresse, setPharmacieAdresse] = useState('');
    const [pharmaciePhoto, setPharmaciePhoto] = useState('');
    const [pharmacieZone, setPharmacieZone] = useState('');
    const [zones, setZones] = useState([]);
    const [selectedPharmacie, setSelectedPharmacie] = useState(null);
    const [openMapModal, setOpenMapModal] = useState(false);




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

    const handleLocation = (pharmacy) => {
        setSelectedPharmacie(pharmacy);
        setOpenMapModal(true);
    };

    const handleCloseMapModal = () => {
        setOpenMapModal(false);
    };

    const openUpdateModal = (pharmacie) => {
        setSelectedPharmacie(pharmacie);
        setPharmacieNom(pharmacie.nom);
        setPharmacieLatitude(pharmacie.latitude);
        setPharmacieLongitude(pharmacie.longitude);
        setPharmacieAdresse(pharmacie.adresse);
        setPharmaciePhoto(pharmacie.photos);
        setPharmacieZone(pharmacie.zone.id);
        setIsOpen(true);
    };

    // const handleUpdate = () => {
    //     console.log(updatedPharmacy)
    //     axios.put(`/api/pharmacies/${updatedPharmacy.id}`, updatedPharmacy)
    //         .then(() => {
    //             setPharmacies(pharmacies => pharmacies.map(pharmacie => {
    //                 if (pharmacie.id === updatedPharmacy.id) {
    //                     return updatedPharmacy;
    //                 }
    //                 return pharmacie;
    //             }));
    //
    //             setIsOpen(false);
    //         })
    //         .catch(error => {
    //             console.error("Error updating pharmacy:", error);
    //
    //         });
    // };

    const handleEditPharmacie = async (id) => {
        try {
            const response = await axios.put(`/api/controller/pharmacies/${id}`, {
                nom:pharmacienom,
                longitude:pharmacielongitude,
                latitude:pharmacielatitude,
                adresse:pharmacieAdresse,
                photos:pharmaciePhoto,
                zone: {
                    id: pharmacieZone
                }

            })
            const updatedPharmacie = pharmacies.map((pharmacie) => {
                if (pharmacie.id === id) {
                    return response.data;
                }else{
                    return pharmacie;
                }
            });
            setPharmacies(updatedPharmacie);
            setIsOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setPharmaciePhoto(e.target.result);
        };
        reader.readAsDataURL(file);
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
                                <CardTitle className="text-white">Pharmacies</CardTitle>

                                <Link to={`/admin/pharmacie-create`}>
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
                                        <th>Photo</th>
                                        <th>Zone</th>
                                        <th>Code QR</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {pharmacies.map((pharmacie) => (
                                        <tr key={pharmacie.id}>
                                            <td>{pharmacie.id}</td>
                                            <td>{pharmacie.nom}</td>
                                            <td>{pharmacie.addresse}</td>
                                            <td><img src={pharmacie.photo} alt={pharmacie.nom} width="100" height="100" /></td>
                                            <td>{pharmacie.zone && pharmacie.zone.nom}</td>
                                            <td><QRCode
                                                value={`Id: ${pharmacie?.id}\n Nom: ${pharmacie?.nom}\n Adresse: ${pharmacie?.addresse}\n zone: ${pharmacie?.zone.nom}\n localisation:https://maps.google.com/maps?q=${pharmacie.latitude},${pharmacie.longitude}`}
                                                size={50}/>
                                            </td>
                                            <td>
                                                <button><FontAwesomeIcon icon={ faTrash} onClick={() => handleDelete(pharmacie.id)}/></button>
                                                <button onClick={() => handleLocation(pharmacie)}>
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                                </button>
                                                <button onClick={() => openUpdateModal(pharmacie)}> <FontAwesomeIcon icon={faEdit} />
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
                                value={pharmacienom} onChange={(e) => setPharmacieNom(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="addresse">Adresse</Label>
                            <Input
                                type="text"
                                name="addresse"
                                id="addresse"
                                value={pharmacieAdresse} onChange={(e) => setPharmacieAdresse(e.target.value)}
                                 />
                        </FormGroup>
                        <FormGroup>
                            <Label for="latitude">Latitude</Label>
                            <Input
                                type="text"
                                name="latitude"
                                id="latitude"
                                value={pharmacielatitude} onChange={(e) => setPharmacieLatitude(e.target.value)}
                               />
                        </FormGroup>
                        <FormGroup>
                            <Label for="longitude">Longitude</Label>
                            <Input
                                type="text"
                                name="longitude"
                                id="longitude"
                                value={pharmacielongitude} onChange={(e) => setPharmacieLongitude(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="photo">Photo</Label>
                            <input type="file" className="form-control" accept="image/*" id="photo"
                                   onChange={handlePhotoChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="zone">Zone</Label>
                            <select className="form-control" id="zoneId"
                                    value={pharmacieZone} onChange={(e) => setPharmacieZone(e.target.value)}>
                                <option value="">Select zone</option>
                                {zones.map((zone) => (
                                    <option key={zone.id} value={zone.id}>
                                        {zone.nom}
                                    </option>
                                ))}
                            </select>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => handleEditPharmacie(selectedPharmacie.id)}>Update</Button>
                    <Button color="secondary" onClick={() => setIsOpen(!isOpen)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
            </div>
            <Dialog open={openMapModal} onClose={handleCloseMapModal}>
                <div className="modal-content">
                    {selectedPharmacie && (
                        <div>
                            <iframe
                                width="800"
                                height="800"
                                frameBorder="0"
                                style={{ border: '1px solid #ccc'}}
                                src={`https://maps.google.com/maps?q=${selectedPharmacie.latitude},${selectedPharmacie.longitude}&hl=es;&output=embed`}
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>
            </Dialog>
        </div>
    );
};

export default PharmacyList;
