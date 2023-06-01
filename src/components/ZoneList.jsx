import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Modal from "react-modal";
import {Button, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Header} from "./Layout";

const ZoneList = () => {
    const [zones, setZones] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedZone, setSelectedZone] = useState(null);
    const [ville, setville] = useState([]);
    const [nom, setName] = useState("");
    const [villeId, setvilleId] = useState("");



    const toggle = () => setModalIsOpen(!modalIsOpen);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`https://pharmacy-location.up.railway.app/api/zones`);
            setZones(result.data);
        };
        fetchData();
    }, [villeId]);

    useEffect(() => {
        const fetchville = async () => {
            const result = await axios(`https://pharmacy-location.up.railway.app/api/villes/`);
            setville(result.data);
        };
        fetchville();
    }, []);

    const handleDelete = (zoneId) => {
        if (window.confirm("Are you sure you want to delete this zone?")) {
            axios.delete(`https://pharmacy-location.up.railway.app/api/zones/${zoneId}`).then(() => {
                setZones(zones.filter((zone) => zone.id !== zoneId));
            });
        }
    };

    const handleOpenModal = (zone) => {
        setSelectedZone(zone);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedZone(null);
        setModalIsOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://pharmacy-location.up.railway.app/api/zones/save', selectedZone)
            .then((response) => {
                setSelectedZone(null);
                setModalIsOpen(false);
                window.location.reload()
            })

    };


    return (
        <div>
            <Header/>
            <div className="main-wrapper">
        <div className="container bg-body mt-3 shadow-lg p-5">
            <div className="d-flex justify-content-between flex-row">
                <h2>Zones</h2>
                <Link to={`/admin/create-zone`}>
                    <a className="btn text-center btn-sm btn-outline-success">new zone</a>

                </Link>
            </div>

            <table className="table rounded p-3 table-light table-hover">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>ville</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {zones.map((zone) => (
                    <tr key={zone.id}>
                        <td>{zone.id}</td>
                        <td>{zone.nom}</td>
                        <td>{zone.ville && zone.ville.nom}</td>
                        <td>
                            <button className="btn m-2 btn-outline-danger" onClick={() => handleDelete(zone.id)}>
                                Delete
                            </button>
                            <button className="btn btn-outline-warning" onClick={() => handleOpenModal(zone)}>
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
                <ModalHeader toggle={toggle}>Modification de la zone</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Nom de la zone:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={selectedZone ? selectedZone.nom : ""}
                                onChange={(event) => setSelectedZone({ ...selectedZone, nom: event.target.value })}
                            />
                        </div>

                        <div className="col-md-6 mb-18">
                            <select
                                className="form-select"
                                value={selectedZone ? selectedZone.ville && selectedZone.ville.id : ""}
                                onChange={(event) => setSelectedZone({ ...selectedZone, ville: { id: event.target.value } })}
                            >

                                <option value="">Select city</option>
                                {ville.map((ville) => (
                                    <option key={ville.id} value={ville.id}>
                                        {ville.nom}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </div>
                </ModalBody>


                <ModalFooter className="p-5">
                    <Button color="success" className="m-2" onClick={handleSubmit}>
                        save
                    </Button>{' '}
                    <Button color="secondary" className="m-2" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

        </div>
            </div>
        </div>
    );
};

export default ZoneList
