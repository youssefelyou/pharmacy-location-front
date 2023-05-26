import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardMedia, FormControl, InputLabel, MenuItem, Select, Typography} from '@mui/material';
import axios from 'axios';
import '../css/home.css';
import {Header} from "./Layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import QRCode from "qrcode.react";

function Home() {
    const [pharmacies, setPharmacies] = useState([]);
    const [villes, setVilles] = useState([]);
    const [zone, setZone] = useState('');
    const [period, setPeriod] = useState('');
    const [selectedVille, setSelectedVille] = useState('');
    const [selectedZone, setSelectedZone] = useState('');


    useEffect(() => {
        fetchPharmacies();
        fetchVilles();
    }, );

    const handleLocation = (latitude, longitude) => {
        // Open a new tab or window with the location based on the latitude and longitude
        window.open(`https://maps.google.com/maps?q=${latitude},${longitude}`);
    };

    const fetchPharmacies = async () => {
        try {
            const response = await axios.get(`/api/pharmacies/`, {
            });
            setPharmacies(response.data);
        } catch (error) {
            console.error('Error fetching pharmacies:', error);
        }
    };

    const fetchVilles = async () => {
        try {
            const response = await axios.get('/api/villes/');
            const villesData = response.data.map((ville) => ({
                id: ville?.id,
                nom: ville?.nom,
                zoneId: ville?.zones?.id,
            }));
            setVilles(villesData);
        } catch (error) {
            console.error('Error fetching villes:', error);
        }
    };

    const handleVilleChange = (event) => {
        const selectedVilleId = event.target.value;
        setSelectedVille(selectedVilleId);

        if (selectedVilleId === '') {
            fetchPharmacies();
        } else {
            const selectedVille = villes.find((ville) => ville?.id === selectedVilleId);
            if (selectedVille) {
                const selectedZoneId = selectedVille?.zoneId;
                setSelectedZone(selectedZoneId);

                axios.get(`/api/villes/${selectedVilleId}/zones/${selectedZoneId}/pharmacies`)
                    .then((response) => {
                        setPharmacies(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching pharmacies by ville and zone:', error);
                    });
            }
        }
    };

    return (<div>
            <Header/>
            <div className="main-wrapper">
                <FormControl sx={{minWidth: 100}}>
                    <InputLabel id="demo-simple-select-label">Cities</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Villes"
                        value={selectedVille}
                        onChange={handleVilleChange}
                    >
                        <MenuItem value="">All cities</MenuItem>
                        {villes.map((ville) => (
                            <MenuItem key={ville.id} value={ville.id}>
                                {ville.nom}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className="pharmacy-filter-container">
                    <div className="pharmacy-cards">
                        {pharmacies.map((pharmacy) => (<Card key={pharmacy.id} sx={{minWidth: 400}}>
                                <CardMedia
                                    component="img"
                                    alt={pharmacy.nom}
                                    height="140"
                                    image={pharmacy.photo}
                                />
                                <CardContent>
                                    <Typography variant="h6">{pharmacy.nom}</Typography>
                                    <Typography variant="body2">{pharmacy.addresse} <button><FontAwesomeIcon icon={faMapMarkerAlt} onClick={() => handleLocation(pharmacy.latitude, pharmacy.longitude)} /></button></Typography>
                                    <Typography variant="body2"></Typography>
                                    <Typography variant="body2"><QRCode
                                        value={`Nom: ${pharmacy?.nom}\n Adresse: ${pharmacy.addresse}\n zone: ${pharmacy.zone.nom}\n localisation:https://maps.google.com/maps?q=${pharmacy.latitude},${pharmacy.longitude}`}
                                        size={50}/></Typography>
                                </CardContent>
                            </Card>))}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Home;
