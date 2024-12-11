import React from 'react';
import { useLocation } from "react-router-dom";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

// Navbar. The top element of a website that you can see from almost anywhere

function Navbar() {
    const location = useLocation();

    // Here you can enter the paths on which you do not wish to see the navbar.
    const hiddenNavbarPaths = ['/login', '/register'];

    if (hiddenNavbarPaths.includes(location.pathname)) {
        return null;
    }
    // I use a different layout for displaying content on a computer and a different one for the mobile version
    return (
        <div>
            <div className="hidden lg:block">
                <DesktopNavbar/>
            </div>
            <div className="block lg:hidden">
                <MobileNavbar/>
            </div>
        </div>
    );
}

export default Navbar;
