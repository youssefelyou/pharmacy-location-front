import React from 'react';
import {useRoutes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from "./components/SignIn";
import AuthGuard from "./guards/AuthGuard";

function App() {
    // return (


    // <Router>
    //     <Header/>
    //     <div className="main-wrapper">
    //         <Routes>
    //             <Route path="/*" element={
    //                 <ProtectedRoute>
    //                     <AdminRoute />
    //                     <AuthRoute/>
    //                 </ProtectedRoute>
    //             }/>
    {/*        </Routes>*/
    }
    {/*    </div>*/
    }

    {/*</Router>*/
    }
    // <Router>
    //     <Header/>
    //          <div className="main-wrapper">
    // <Routes>
    //     <Route path="/" element={<SignIn />} exact />
    //     <Route path="/city-list" element={<CityList />} />
    //     <Route path="/home" element={<Home />} />
    //     <Route path="/create-city" element={<CityForm />} />
    //     <Route path="/zone" element={<ZoneList />} />
    //     <Route path="/create-zone" element={<ZoneForm />} />
    //     <Route path="/zoneByCity" element={<ZoneByCity />} />
    //     <Route path="/pharmacie" element={<PharmacyList />} />
    //     <Route path="/pharmacie-create" element={<PharmacyForm />} />
    //     <Route path="/pharmaciegarde" element={<GardePharmacieList />} />
    //     <Route path="/pharmaciegarde-create" element={<GardePharmacie />} />
    // </Routes>
    //          </div>
    // </Router>
    // );

    const routing = useRoutes([{
        path: '/*', element: <AuthGuard/>
    }, {
        path: '/login', element: <SignIn/>,
    },]);
    return (<div className="dark">{routing}</div>)
}

export default App;
