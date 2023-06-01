import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faGithub,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { logout } from "../auth/auth";
import avatar from "../image/avatar.png";

function Header() {
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State for mobile navbar

    const handleAvatarClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        logout();
    };

    const isSignInPage = location.pathname === "/";

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-success">
            <nav className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleNavbar}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand fw-bold" href="/">
                    <img
                        width="40"
                        height="40"
                        className="m-1"
                        src="https://img.icons8.com/external-xnimrodx-lineal-gradient-xnimrodx/64/external-pharmacy-pharmacy-xnimrodx-lineal-gradient-xnimrodx-2.png"
                        alt="external-pharmacy-pharmacy-xnimrodx-lineal-gradient-xnimrodx-2"
                    />
                    pHARMACY
                </a>

                <div className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {!isSignInPage && (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/admin/home"
                                        activeClassName="active"
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/admin/city-list"
                                        activeClassName="active"
                                    >
                                        Ville
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/admin/zone"
                                        activeClassName="active"
                                    >
                                        Zone
                                    </NavLink>
                                </li>
                                {/*<li className="nav-item">*/}
                                {/*    <NavLink className="nav-link" to="/admin/zoneByCity" activeClassName="active">*/}
                                {/*        Zone par ville*/}
                                {/*    </NavLink>*/}
                                {/*</li>*/}
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/admin/pharmacie"
                                        activeClassName="active"
                                    >
                                        Pharmacie
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/admin/pharmaciegarde"
                                        activeClassName="active"
                                    >
                                        Pharmacie de Garde
                                    </NavLink>
                                </li>
                            </>
                        )}
                        <div className="d-flex align-items-center">
                            <div className="nav-item dropdown">
                                <div
                                    className={`nav-link dropdown-toggle ${
                                        isDropdownOpen ? "show" : ""
                                    }`}
                                    onClick={handleAvatarClick}
                                >
                                    <img
                                        className="avatar"
                                        alt="User Avatar"
                                        src={avatar}
                                        width={20}
                                        height={20}
                                    />
                                </div>
                                {isDropdownOpen && (
                                    <ul className="dropdown-menu dropdown-menu-end show">
                                        <li>
                                            <button className="dropdown-item" onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </ul>


                </div>
            </nav>
        </header>
    );
}

// Footer component remains the same


// Footer component remains the same

const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start">
            <p className="text-center p-3">© {new Date().getFullYear()} Youssef Elyourizi</p>
            <div className="singleCol social-media-icons-white d-flex justify-content-around">
                <a href="http://facebook.com">
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="http://instagram.com">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="http://github.com">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </div>
        </footer>
    );
};

export {
    Header, Footer
};
