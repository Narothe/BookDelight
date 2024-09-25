import React from 'react';
import { Link, useLocation } from "react-router-dom";
import logo from '../assets/bookdelight_logo.png'

function Navbar() {
    const location = useLocation();

    const hiddenNavbarPaths = ['/login'];

    if (hiddenNavbarPaths.includes(location.pathname)) {
        return null;
    }

    return (
        <nav className="flex justify-between mb-9">
            <Link to="/" className="flex items-center font-dancing font-bold text-3xl">
                <img src={logo} alt="BookDelight Logo" className="h-14 w-auto inline-block mr-2"/>
                <p>BookDelight</p>
            </Link>
            <Link to="/login">
                Login
            </Link>
        </nav>
    );
}

export default Navbar;
