import React from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/bookdelight_logo.png";

function LogoLink() {
    return (
            <Link to="/" className="flex items-center mr-5">
                <img src={logo} alt="BookDelight Logo" className="h-12 w-auto lg:h-14 inline-block mr-2"/>
                <p className="font-dancing text-2xl lg:text-3xl font-bold">BookDelight</p>
            </Link>

    );
}

export default LogoLink;
