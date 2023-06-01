import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {Card, CardBody, CardHeader, CardTitle} from "reactstrap";
import {Header} from "./Layout";

const CityForm = () => {
    const [nom, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://pharmacy-location.up.railway.app/api/villes/save', {nom: nom}).then(() => {

        });
    };

    return (
        <div>
            <Header/>
            <div className="main-wrapper">
                <div className="container mt-3  p-5">
                    <Card className="shadow-lg">
                        <CardHeader className="d-flex bg-success   justify-content-between flex-row">
                            <CardTitle className="text-white">create zone</CardTitle>
                        </CardHeader>

                        <CardBody>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="nom de ville"
                                                id="name"
                                                value={nom}
                                                onChange={(e) => {
                                                    const inputValue = e.target.value;
                                                    const onlyLetters = inputValue.replace(/[^A-Za-z]/g, "");
                                                    setName(onlyLetters);
                                                }}

                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <Link to="/admin/city-list">
                                            <button type="submit" className="btn w-100  btn-outline-success">
                                                Create
                                            </button>
                                        </Link>

                                    </div>
                                </div>


                            </form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>);
};

export default CityForm;