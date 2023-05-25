import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/Layout';
import CityList from './components/CityList';
import CityForm from './components/CityForm';
import ZoneList from './components/ZoneList';
import ZoneForm from './components/ZoneForm';
import ZoneByCity from './components/ZoneByCity';
import 'bootstrap/dist/css/bootstrap.min.css';
import PharmacyForm from './components/PharmacyForm';
import PharmacyList from './components/PharmacyList';
import GardePharmacie from './components/GardePharmacie';
import GardePharmacieList from './components/GardePharmacieList';
import SignIn from './components/SignIn';

function App() {
    return (
        <Router>
            <Header/>
            <div className="main-wrapper">
                <Routes>
                    <Route path="/" element={<SignIn />} exact /> {/* Set SignIn as the initial route */}
                    <Route path="/city-list" element={<CityList />} />
                    <Route path="/create-city" element={<CityForm />} />
                    <Route path="/zone" element={<ZoneList />} />
                    <Route path="/create-zone" element={<ZoneForm />} />
                    <Route path="/zoneByCity" element={<ZoneByCity />} />
                    <Route path="/pharmacie" element={<PharmacyList />} />
                    <Route path="/pharmacie-create" element={<PharmacyForm />} />
                    <Route path="/pharmaciegarde" element={<GardePharmacieList />} />
                    <Route path="/pharmaciegarde-create" element={<GardePharmacie />} />
                </Routes>
            </div>

        </Router>
    );
}

export default App;
