import React from 'react';

// Display a rating value

function DisplayRating({ value }) {
    if (value === null || value === undefined) {
        return (
            <div>
                <p>-</p>
            </div>
    )
        ;
    }

    const formattedValue = typeof value === 'number' ? value.toLocaleString() : value;

    return (
        <div>
            <p>{formattedValue}</p>
        </div>
    );
}

export default DisplayRating;
