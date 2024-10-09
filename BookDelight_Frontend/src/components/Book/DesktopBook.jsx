import React from 'react';
import LoadBookImage from "../../utils/LoadBookImage";
import BookInfo from "./BookInfo";
import BookRatingInfo from "./BookRatingInfo";

function DesktopBook({ book, photoUrl }) {

    return (
        <div className="container py-8 border p-4 mb-4 shadow-md rounded-lg bg-orange-100">
            <div className="flex border p-4 mb-4 rounded-lg shadow-md bg-orange-50">
                <div className="flex flex-col w-56">
                    <div className="pb-4">
                        <LoadBookImage item={book} photoUrl={photoUrl}/>
                    </div>
                    <BookInfo book={book}/>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex flex-row w-full px-4 justify-between">
                        <div className="flex flex-col">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">{book.title}</h2>
                            <p className="text-sm md:text-base lg:text-lg font-semibold mb-2"> by:{' '} {book.authors.join(', ')} </p>
                        </div>
                        <BookRatingInfo book={book}/>
                    </div>
                    <div className="flex flex-row px-4">
                        <div className="flex flex-col text-sm md:text-base lg:text-lg font-semibold">
                            <p className="py-4 mb-2">{book.short_description}</p>
                            <p className="py-2 mb-2">{book.long_description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DesktopBook;
