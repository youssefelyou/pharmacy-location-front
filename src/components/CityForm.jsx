import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Card, CardBody, CardHeader, CardTitle} from "reactstrap";

const CityForm = () => {
    const [nom, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/villes/save', {nom}).then(() => {
            navigate("/");
        });
    };

    return (<div className="container mt-3  p-5">
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
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <button type="submit" className="btn w-100  btn-outline-success">
                                Create
                            </button>
                        </div>
                    </div>


                </form>
            </CardBody>
        </Card>
    </div>);
};

export default CityForm;
