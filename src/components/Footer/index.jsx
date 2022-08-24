import React from "react";
import { Link } from "react-router-dom";
import { toTheTop } from "../../customScripts";
import logo from '../img/assets/ChuckBerry.png';
import Navbar from 'react-bootstrap/Navbar';
import './Footer.css';

export default function Footer () {

    return (
        <Navbar className="footer" bg="dark" variant="dark">
            <Navbar.Brand>
                <img
                    alt="Logo B. Goode"
                    src={logo}
                    width="40"
                    height="40"
                    />
                    B. Goode
                </Navbar.Brand>
                <Navbar.Text className="terms">
                    <div>© B. Goode, 2022. All rights reserved.</div>
                </Navbar.Text>
                <Navbar.Text>
                    <Link to='/about' onClick={() => toTheTop()}>
                        <div>About Us</div>
                    </Link>
                </Navbar.Text>
        </Navbar>
    );
}