import {Route, Routes} from "react-router-dom";
import SignIn from "../components/SignIn";

const AuthRoute = () => {
    return (
        <Routes>
            <Route path="" element={<SignIn/>}/>
        </Routes>
    );
};

export default AuthRoute;