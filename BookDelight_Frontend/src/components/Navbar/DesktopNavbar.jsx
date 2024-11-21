import React from 'react';
import SearchBar from "./SearchBar";
import LinkButton from "../../utils/LinkButton";
import LogoLink from "../../utils/LogoLink";


function DesktopNavbar() {
    return (
        <nav className="flex justify-between mb-9 p-2 border-y">
            <LogoLink/>
            <div className="flex flex-auto items-center mr-2">
                <SearchBar/>
            </div>
            <div className="grid place-content-center">
                <LinkButton text="Log in" link="/login"/>
            </div>
        </nav>
    );
}

export default DesktopNavbar;
