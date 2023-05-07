import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components/Layout";
import CityList from "./components/CityList";
import CityForm from "./components/CityForm";
import ZoneList from "./components/ZoneList";
import ZoneForm from "./components/ZoneForm";
import ZoneByCity from "./components/ZoneByCity";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <Router>
        <Header />
        <div className="main-wrapper">
          <Routes>
            <Route path="/" element={<CityList />} />
            <Route path="/create-city" element={<CityForm />} />
            <Route path="/zone" element={<ZoneList/>} />
            <Route path="/create-zone" element={<ZoneForm />} />
            <Route path="/zoneByCity" element={<ZoneByCity />} />
          </Routes>
        </div>
        <Footer />
      </Router>
  );
}

export default App;
