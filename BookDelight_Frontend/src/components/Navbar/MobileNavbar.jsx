import React from 'react';
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import LinkButton from "../../utils/LinkButton";
import logo from "../../assets/bookdelight_logo.png";

function MobileNavbar() {
    return (
        <nav className="flex flex-col justify-between mb-9">
            <div className="flex flex-row justify-between mb-3">
                <Link to="/" className="flex items-center font-dancing font-bold text-3xl">
                    <img src={logo} alt="BookDelight Logo" className="h-14 w-auto inline-block mr-2"/>
                    <p>BookDelight</p>
                </Link>
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
