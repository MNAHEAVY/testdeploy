// React utilities
import React from "react";
import { Link } from "react-router-dom";
// Componentss
import SearchBar from "../SearchBar/SearchBar";
import LogInBtn from "../LogInBtn";
import LogOutBtn from "../LogOutBtn";
import LightDarktn from "../LightDarkBtn";
// Files and extra code
import goode_logo from '../../components/img/assets/ChuckBerry.png'
import toTheTop from '../../customScripts';
// Auth0
import { useAuth0 } from '@auth0/auth0-react';
// Style
import 'bootstrap/dist/css/bootstrap.css';
import './NavBar.css';

export default function NavBar() {

    const { user, isAuthenticated, isLoading } = useAuth0()

    return (
        <nav className="navbar mb-2 p-2 bg-dark sticky-top rounded">
            <div className="containerNavBar container-fluid justify-content-around ">
                <div className="d-flex align-items-center">
                    <div className="d-flex me-5">
                        <img className="navbarLogo" src={goode_logo} alt="Logo B. Goode" width="40" height='40' />
                        <Link className="navbar-brand" onClick={() => toTheTop()} to="/">
                            B. Goode
                        </Link>
                    </div>
                </div>

                <div className="navbar-nav hstack gap-3">
                    <Link to='/home' className="nav-link" onClick={() => toTheTop()} >Products</Link>
                    <Link to='/contact' className="nav-link" onClick={() => toTheTop()}>Contact us</Link>
                    <Link to='/create' className="nav-link" onClick={() => toTheTop()}>Sell</Link>
                </div>

                <SearchBar />

                <div>
                    {isAuthenticated ?
                        <>
                            <Link to="profile">
                                <img className="ProfileImg" src={user.picture} alt="user" />
                            </Link>
                            <LogOutBtn />
                        </>
                        : (!isLoading && <LogInBtn />)}
                </div>
                <LightDarktn />
            </div>
        </nav>
    );
}