import React from 'react';

function Button({ text }) {
    return (
        <button className="bg-custom-light-blue hover:bg-custom-hover-light-blue text-white px-7 rounded-full">
            <p className="pb-1">{text}</p>
        </button>
    );
}

export default Button;
