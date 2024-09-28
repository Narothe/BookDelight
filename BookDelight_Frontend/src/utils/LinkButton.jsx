import React from 'react';
import {Link} from "react-router-dom";

function LinkButton({ text, link }) {
    return (
        <Link to={link} className="bg-custom-light-blue hover:bg-custom-hover-light-blue text-white px-7 text-center rounded-full">
            <p className="pb-1">{text}</p>
        </Link>
    );
}

export default LinkButton;
