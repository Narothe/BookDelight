import React from 'react';
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();

    const hiddenNavbarPaths = ['/login'];

    if (hiddenNavbarPaths.includes(location.pathname)) {
        return null;
    }

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
        </nav>
    );
}

export default Navbar;
