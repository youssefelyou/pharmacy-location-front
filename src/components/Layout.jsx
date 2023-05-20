import React from "react";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faGithub, faInstagram} from '@fortawesome/free-brands-svg-icons';

function Header() {
    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-success">
            <nav className="container-fluid">
                <a className="navbar-brand fw-bold" href="/">
                    <img width="40" height="40" className="m-1"
                         src="https://img.icons8.com/external-xnimrodx-lineal-gradient-xnimrodx/64/external-pharmacy-pharmacy-xnimrodx-lineal-gradient-xnimrodx-2.png"
                         alt="external-pharmacy-pharmacy-xnimrodx-lineal-gradient-xnimrodx-2"/>
                    pHARMACY
                </a>

                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" activeClassName="active">
                            Ville
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/zone" activeClassName="active">
                            Zone
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/zoneByCity" activeClassName="active">
                            Zone par ville
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/pharmacie" activeClassName="active">
                            Pharmacie
                        </NavLink>
                    </li>


                    <li className="nav-item">
                        <NavLink className="nav-link" to="/pharmaciegarde" activeClassName="active">
                            Pharmacie de Garde
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start">
            <p className="text-center p-3">© {new Date().getFullYear()} Youssef Elyourizi</p>
            <div className="singleCol social-media-icons-white d-flex justify-content-around">
                <a href="http://facebook.com">
                    <FontAwesomeIcon icon={faFacebook}/>
                </a>

                <a href="http://instagram.com">
                    <FontAwesomeIcon icon={faInstagram}/>
                </a>

                <a href="http://github.com">
                    <FontAwesomeIcon icon={faGithub}/>
                </a>

            </div>
        </footer>
    );
};

export {
    Header, Footer
};