import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Dialog,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from '@mui/material';
import axios from 'axios';
import '../css/home.css';
import { Header } from "./Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import QRCode from "qrcode.react";

function Home() {
    const [pharmacies, setPharmacies] = useState([]);
    const [villes, setVilles] = useState([]);
    const [selectedVille, setSelectedVille] = useState('');
    const [selectedZone, setSelectedZone] = useState('');
    const [zones, setZones] = useState([]);
    const [selectedPharmacy, setSelectedPharmacy] = useState(null);
    const [openMapModal, setOpenMapModal] = useState(false);
    const [ville, setVille] = useState('');
    const [zone, setZone] = useState('');

    useEffect(() => {
        fetchPharmacies();
        fetchVilles();
    }, [selectedVille, selectedZone]);

    const fetchVilles = async () => {
        try {
            const response = await axios.get('/api/villes/');
            setVilles(response.data);
        } catch (error) {
            console.error('Error fetching villes:', error);
        }
    };

    const fetchZones = async (villeId) => {
        try {
            const response = await axios.get(`/api/zones/villeid/${villeId}`);
            setZones(response.data);
        } catch (error) {
            console.error('Error fetching zones:', error);
        }
    };

    const fetchPharmacies = async () => {
        try {
            let url = '/api/pharmacies/';
            if (selectedVille && selectedZone) {
                url = `/api/villes/villes/${selectedVille.nom}/zones/${selectedZone.nom}/pharmacies`;
            }
            const response = await axios.get(url);
            setPharmacies(response.data);
        } catch (error) {
            console.error('Error fetching pharmacies:', error);
        }
    };

    const findZonesByVille = (nom) => {
        const selectedVille = villes.find((ville) => ville.nom === nom);
        if (selectedVille) {
            setSelectedVille(selectedVille);
            fetchZones(selectedVille.id);
        }
    };

    const onChangeVille = (value) => {
        console.log(`selected ${value}`);
        const selectedVille = villes.find((ville) => ville.nom === value);
        setSelectedVille(selectedVille);
        setSelectedZone('');
        findZonesByVille(selectedVille?.nom);
    };


    const onChangeZone = (value) => {
        console.log(`selected ${value}`);
        const selectedZone = zones.find((zone) => zone.nom === value);
        setSelectedZone(selectedZone);
    };


    const handleLocation = (pharmacy) => {
        setSelectedPharmacy(pharmacy);
        setOpenMapModal(true);
    };

    const handleCloseMapModal = () => {
        setOpenMapModal(false);
    };

    return (
        <div>
            <Header />
            <div className="main-wrapper">
                <FormControl sx={{ minWidth: 100 }}>
                    <InputLabel id="ville-select-label">Cities</InputLabel>
                    <Select
                        labelId="ville-select-label"
                        id="ville-select"
                        label="Villes"
                        value={selectedVille?.nom}
                        onChange={(e) => onChangeVille(e.target.value)}
                    >
                        <MenuItem value="">All cities</MenuItem>
                        {villes?.map((ville) => (
                            <MenuItem key={ville.id} value={ville.nom}>
                                {ville.nom}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 100 }}>
                    <InputLabel id="zone-select-label">Zones</InputLabel>
                    <Select
                        labelId="zone-select-label"
                        id="zone-select"
                        label="zone"
                        value={selectedZone?.nom}
                        onChange={(e) => onChangeZone(e.target.value)}
                    >
                        <MenuItem value="">All zones</MenuItem>
                        {zones?.map((zone) => (
                            <MenuItem key={zone.nom} value={zone.nom}>
                                {zone.nom}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className="pharmacy-filter-container">
                    <div className="pharmacy-cards">
                        {pharmacies.map((pharmacy) => (
                            <Card key={pharmacy.id} sx={{ minWidth: 400 }}>
                                <CardMedia component="img" alt={pharmacy.nom} height="140" image={pharmacy.photo} />
                                <CardContent>
                                    <Typography variant="h6">{pharmacy.nom}</Typography>
                                    <Typography variant="body2">
                                        {pharmacy.addresse}{' '}
                                        <button onClick={() => handleLocation(pharmacy)}>
                                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        </button>
                                    </Typography>
                                    <Typography variant="body2"></Typography>
                                    <Typography variant="body2">
                                        <QRCode
                                            value={`Nom: ${pharmacy?.nom}\n Adresse: ${pharmacy.addresse}\n zone: ${pharmacy.zone.nom}\n localisation: https://maps.google.com/maps?q=${pharmacy.latitude},${pharmacy.longitude}`}
                                            size={50}
                                        />
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
            <Dialog open={openMapModal} onClose={handleCloseMapModal}>
                <div className="modal-content">
                    {selectedPharmacy && (
                        <div>
                            <iframe
                                width="800"
                                height="800"
                                frameBorder="0"
                                style={{ border: '5px solid #ccc' }}
                                src={`https://maps.google.com/maps?q=${selectedPharmacy.latitude},${selectedPharmacy.longitude}&hl=es;&output=embed`}
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>
            </Dialog>
        </div>
    );
}

export default Home;
