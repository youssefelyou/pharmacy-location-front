import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Modal from "react-modal";
import {Button, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const ZoneList = ({villeId}) => {
    const [zones, setZones] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedZone, setSelectedZone] = useState(null);
    const [ville, setville] = useState([]);

    const toggle = () => setModalIsOpen(!modalIsOpen);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`/api/zones`);
            setZones(result.data);
        };
        fetchData();
    }, [villeId]);

    useEffect(() => {
        const fetchville = async () => {
            const result = await axios(`/api/villes/`);
            setville(result.data);
        };
        fetchville();
    }, []);

    const handleDelete = (zoneId) => {
        if (window.confirm("Are you sure you want to delete this zone?")) {
            axios.delete(`/api/zones/${zoneId}`).then(() => {
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

    const handleSave = () => {
        // TODO: handle save logic
        handleCloseModal();
    };

    return (
        <div className="container bg-body mt-3 shadow-lg p-5">
            <div className="d-flex justify-content-between flex-row">
                <h2>Zones</h2>
                <Link to={`/create-zone`}>
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
                            <input type="text" className="form-control" value={selectedZone && selectedZone.nom}/>
                        </div>
                        <div className="col-md-6">
                            <label>Ville:</label>
                            <select  className="form-select" value={selectedZone && selectedZone.ville && selectedZone.ville.id}>
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
                    <Button color="success" className="m-2" onClick={handleSave}>
                        save
                    </Button>{' '}
                    <Button color="secondary" className="m-2" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

        </div>
    );
};

export default ZoneList
