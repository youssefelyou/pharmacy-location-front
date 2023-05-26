import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import AuthService from "../auth/AuthService";

import {
    MDBBtn,
    MDBCheckbox,
    MDBContainer,
    MDBInput,
    MDBTabs,
    MDBTabsContent,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsPane
} from 'mdb-react-ui-kit';
import axios from "axios";

function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [justifyActive, setJustifyActive] = useState('tab1');
    ;
    const [error, setError] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await AuthService.login(email, password);
            console.log(user);
            navigate('/admin/home');

        } catch (error) {
            console.error(error);
        }
    };

    const handleSignUp = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8080/api/auth/register', {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            role: 'USER',
            email: email
        }).then(response => {
            window.location = '/';
        }).catch(error => {
            setError(error.response.data.message);
        });
    };

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

            <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                        Login
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                        Register
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>

                <MDBTabsPane show={justifyActive === 'tab1'}>

                    <div className="text-center mb-3">
                        <p>Sign in with:</p>
                    </div>

                    <MDBInput wrapperClass='mb-4' onChange={e => setEmail(e.target.value)}
                              label='Email address'
                              id='form1'
                              value={email}
                              type='email'/>
                    <MDBInput wrapperClass='mb-4'
                              label='Password'
                              id='form2'
                              value={password}
                              onChange={e => setPassword(e.target.value)}
                              type='password'/>


                    <MDBBtn className="mb-4 w-100" onClick={handleSubmit}>Sign in</MDBBtn>


                </MDBTabsPane>

                <MDBTabsPane show={justifyActive === 'tab2'}>

                    <div className="text-center mb-3">


                    </div>

                    <MDBInput wrapperClass='mb-4' label='First Name' id='form1' type='text'
                              onChange={event => setFirstName(event.target.value)}/>
                    <MDBInput wrapperClass='mb-4' label='Last Name' id='form1' type='text'
                              onChange={event => setLastName(event.target.value)}/>
                    <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text'
                              onChange={event => setUsername(event.target.value)}/>
                    <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'
                              onChange={event => setEmail(event.target.value)}/>
                    <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'
                              onChange={event => setPassword(event.target.value)}/>

                    <div className='d-flex justify-content-center mb-4'>
                        <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms'/>
                    </div>

                    <MDBBtn className="mb-4 w-100" onClick={handleSignUp}>Sign up</MDBBtn>

                </MDBTabsPane>

            </MDBTabsContent>

        </MDBContainer>
    );
}

export default SignIn;