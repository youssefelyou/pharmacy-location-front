import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
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

    useEffect(() => {
        fetchPharmacies();
        fetchVilles();
        fetchZones();
    }, []);

    const fetchVilles = async () => {
        try {
            const response = await axios.get('/api/villes/');
            setVilles(response.data);
        } catch (error) {
            console.error('Error fetching villes:', error);
        }
    };
    const fetchZones = async () => {
        try {
            const response = await axios.get('/api/zones/');
            setZones(response.data);
        } catch (error) {
            console.error('Error fetching zones:', error);
        }
    };

    const handleVilleChange = (event) => {
        const selectedVilleId = event.target.value;
        setSelectedVille(selectedVilleId);
        setSelectedZone(''); // Reset selected zone when city changes

        if (selectedVilleId === '') {
            fetchPharmacies();
        } else {
            const selectedVille = villes.find((ville) => ville.id === selectedVilleId);
            if (selectedVille) {
                const selectedZoneId = selectedVille.zoneId;
                setSelectedZone(selectedZoneId);

            }
        }
    };

    const fetchPharmaciesByVilleAndZone = (villeId, zoneId) => {
        axios
            .get(`/api/villes/${villeId}/zones/${zoneId}/pharmacies`)
            .then((response) => {
                setPharmacies(response.data);
            })
            .catch((error) => {
                console.error('Error fetching pharmacies by ville and zone:', error);
            });
    };



    const handleZoneChange = (event) => {
        const selectedZoneId = event.target.value;
        setSelectedZone(selectedZoneId);
        fetchPharmaciesByVilleAndZone(selectedVille, selectedZoneId);
    };

    const fetchPharmacies = async (villeId, zoneId) => {
        try {
            let url = '/api/pharmacies/';
            if (villeId && zoneId) {
                url = `/api/villes/${villeId}/zones/${zoneId}/pharmacies`;
            }
            const response = await axios.get(url);
            setPharmacies(response.data);
        } catch (error) {
            console.error('Error fetching pharmacies:', error);
        }
    };

    const handleLocation = (latitude, longitude) => {
        // Open a new tab or window with the location based on the latitude and longitude
        window.open(`https://maps.google.com/maps?q=${latitude},${longitude}`);
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
                        value={selectedVille}
                        onChange={handleVilleChange}
                    >
                        <MenuItem value="">All cities</MenuItem>
                        {villes?.map((ville) => (
                            <MenuItem key={ville.id} value={ville.id}>
                                {ville.nom}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {selectedVille &&
                    (
                        <FormControl sx={{ minWidth: 100 }}>
                            <InputLabel id="demo-simple-select-label">Zones</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Zones"
                                value={selectedZone}
                                onChange={handleZoneChange}
                            >
                                <MenuItem value="">All zones</MenuItem>
                                {villes?.map((ville) => {
                                    if (ville.id === selectedVille) {
                                        return ville.zones?.map((zone) => (
                                            <MenuItem key={zone.id} value={zone.id}>
                                                {zone?.nom}
                                            </MenuItem>
                                        ));
                                    }
                                    return null;
                                })}
                            </Select>
                        </FormControl>


                    )}
                <div className="pharmacy-filter-container">
                    <div className="pharmacy-cards">
                        {pharmacies.map((pharmacy) => (
                            <Card key={pharmacy.id} sx={{ minWidth: 400 }}>
                                <CardMedia component="img" alt={pharmacy.nom} height="140" image={pharmacy.photo} />
                                <CardContent>
                                    <Typography variant="h6">{pharmacy.nom}</Typography>
                                    <Typography variant="body2">
                                        {pharmacy.addresse}{' '}
                                        <button>
                                            <FontAwesomeIcon
                                                icon={faMapMarkerAlt}
                                                onClick={() => handleLocation(pharmacy.latitude, pharmacy.longitude)}
                                            />
                                        </button>
                                    </Typography>
                                    <Typography variant="body2"></Typography>
                                    <Typography variant="body2">
                                        <QRCode
                                            value={`Nom: ${pharmacy?.nom}\n Adresse: ${pharmacy.addresse}\n zone: ${
                                                pharmacy.zone.nom
                                            }\n localisation:https://maps.google.com/maps?q=${pharmacy.latitude},${
                                                pharmacy.longitude
                                            }`}
                                            size={50}
                                        />
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
