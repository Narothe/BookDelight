import React from 'react';
import {Link} from "react-router-dom";

function LinkButton({ text, link, color }) {
    if (color === 'blue') {
        return (
            <Link to={link} className="bg-custom-light-blue hover:bg-custom-hover-light-blue text-white px-7 h-7 text-center rounded-full ">
                <p className="pb-1">{text}</p>
            </Link>
        );
    } else if (color === 'orange') {
        return (
            <Link to={link} className="bg-orange-100 hover:bg-orange-200 px-7 h-7 text-center rounded-full">
                <p className="pb-1">{text}</p>
            </Link>
        );
    }

    return (
        <Link to={link} className="bg-custom-light-blue hover:bg-custom-hover-light-blue text-white px-7 h-7 text-center whitespace-nowrap rounded-full active:border-custom-light-blue">
            <p className="pb-1">{text}</p>
        </Link>
    );
}

export default LinkButton;
