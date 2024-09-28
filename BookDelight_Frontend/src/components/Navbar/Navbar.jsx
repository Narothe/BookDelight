import React from 'react';
import { Link, useLocation } from "react-router-dom";
import logo from '../../assets/bookdelight_logo.png'
import LinkButton from "../../utils/LinkButton";
import SearchBar from "./SearchBar";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

function Navbar() {
    const location = useLocation();

    const hiddenNavbarPaths = ['/login'];

    if (hiddenNavbarPaths.includes(location.pathname)) {
        return null;
    }

    return (
        <div>
            <div className="hidden md:block">
                <DesktopNavbar/>
            </div>
            <div className="block md:hidden">
                <MobileNavbar/>
            </div>
        </div>
    );
}

export default Navbar;
