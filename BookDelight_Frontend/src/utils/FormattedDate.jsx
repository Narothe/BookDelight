import React from 'react';

// Display a formatted date

function FormattedDate({ date }) {

    const formatDate = (date) => {

        if (date && date.includes('T')) {
            return date.split('T')[0];
        }
        return date;
    };

    return (
        <p>{formatDate(date)}</p>
    );
}

export default FormattedDate;
