import React from 'react';
import SearchBar from "./SearchBar";
import LinkButton from "../../utils/LinkButton";
import LogoLink from "../../utils/LogoLink";

function MobileNavbar() {
    return (
        <nav className="flex flex-col justify-between mb-9 p-2 border-y">
            <div className="flex flex-row justify-between mb-3">
                <LogoLink/>
                <div className=" grid place-content-center">
                    <LinkButton text="Log in" link="/login"/>
                </div>
            </div>
            <div className="flex flex-auto items-center">
                <SearchBar/>
            </div>
        </nav>
    );
}

export default MobileNavbar;
