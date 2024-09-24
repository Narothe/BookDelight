import React from 'react';

function DisplayRating({ value }) {
    if (value === null || value === undefined) {
        return (
            <p>NaN</p>
        );
    }

    const formattedValue = typeof value === 'number' ? value.toLocaleString() : value;

    return (
        <p>{formattedValue}</p>
    );
}

export default DisplayRating;
