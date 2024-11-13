import React from 'react';
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import logo from "../../assets/bookdelight_logo.png";
import LinkButton from "../../utils/LinkButton";


function DesktopNavbar() {
    return (
        <nav className="flex justify-between mb-9 p-2 border">
            <Link to="/" className="flex items-center mr-5">
                <img src={logo} alt="BookDelight Logo" className="h-12 w-auto lg:h-14 inline-block mr-2"/>
                <p className="font-dancing text-2xl lg:text-3xl font-bold">BookDelight</p>
            </Link>
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
