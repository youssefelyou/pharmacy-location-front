import React, {useState} from 'react';
import {Button, Col, Container, Input, Row} from 'reactstrap';
import {useNavigate} from "react-router-dom";
import AuthService from "../auth/AuthService";



function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await AuthService.login(email, password);
            console.log(user);
            if (user?.role === 'ADMIN') {
                navigate('/');
            } else {
                navigate('/pharmacie');
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container fluid className="p-3 my-5 h-custom">

            <Row>

                <Col col='10' md='6'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                         className="img-fluid"/>
                </Col>

                <Col col='4' md='6'>

                    <div className="d-flex flex-row align-items-center justify-content-center">

                        <p className="lead fw-normal mb-0 me-3">Sign in with</p>


                    </div>

                    <div className="divider d-flex align-items-center my-4">
                        <p className="text-center fw-bold mx-3 mb-0">Or</p>
                    </div>

                    <Input wrapperClass='mb-4'
                           onChange={e => setEmail(e.target.value)}
                           label='Email address'
                           placeholder="Email address"
                           value={email}
                           id='formControlLg' type='email' size="lg"/>


                    <Input wrapperClass='mb-4' label='Password' value={password}
                           placeholder="Password"
                           onChange={e => setPassword(e.target.value)}
                           id='formControlLg' type='password' size="lg"/>

                    <div className="d-flex justify-content-between mb-4">
                        <Input type='checkbox' name='flexCheck' value='' id='flexCheckDefault' label='Remember me'/>
                        Remember me
                        <a href="!#">Forgot password?</a>
                    </div>

                    <div className='text-center text-md-start mt-4 pt-2'>
                        <Button onClick={handleSubmit} className="mb-0 px-5" size='lg'>Login</Button>

                        {/*<p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="#!"*/}
                        {/*                                                                      className="link-danger">Register</a>*/}
                        {/*</p>*/}
                    </div>

                </Col>

            </Row>




        </Container>
    );
}

export default SignIn;