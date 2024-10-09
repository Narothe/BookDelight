import React from 'react';
import FormattedDate from "../../utils/FormattedDate";

function BookInfo({ book }) {

    return (
        <div className="flex flex-col text-sm md:text-base lg:text-lg font-semibold px-4 border-4 border-orange-200 rounded-lg">
            <p className="mt-3">Publisher:</p>
            <p className="mb-3">{book.publisher}</p>
            <p className="">Publication date:</p>
            <div className="mb-3">
                <FormattedDate date={book.publication_date}/>
            </div>
            <p className="">ISBN:</p>
            <p className="mb-3">{book.isbn}</p>
            <p className="mb-3">Book length: {book.book_length}</p>
        </div>
    );
}

export default BookInfo;