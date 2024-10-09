import React from 'react';

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
