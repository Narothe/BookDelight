import React from 'react';
import { useLocation } from "react-router-dom";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

function Navbar() {
    const location = useLocation();

    const hiddenNavbarPaths = ['/login', '/register'];

    if (hiddenNavbarPaths.includes(location.pathname)) {
        return null;
    }

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
