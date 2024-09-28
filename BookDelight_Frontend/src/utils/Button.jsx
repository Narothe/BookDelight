import React from 'react';

function Button({ text }) {
    return (
        <button className="bg-orange-100 hover:bg-orange-200 px-7 rounded-full">
            <p className="pb-1">{text}</p>
        </button>
    );
}

export default Button;
