import React from 'react';
import LoadBookImage from "../../utils/LoadBookImage";
import BookInfo from "./BookInfo";
import BookRatingInfo from "./BookRatingInfo";
import ReviewMobile from "../Comments/ReviewMobile";

function DesktopBook({ book, review, photoUrl }) {

    return (
        <div className="flex flex-col">

            <div className="flex border p-4 rounded-md shadow-md bg-white">
                <div className="flex flex-col w-56">
                    <div className="pb-4">
                        <LoadBookImage item={book} photoUrl={photoUrl}/>
                    </div>
                    <div className="flex px-4 mb-2">
                        <BookRatingInfo book={book}/>
                    </div>
                    <BookInfo book={book}/>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex flex-row w-full px-6 justify-between">
                        <div className="flex flex-col">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">{book.title}</h2>
                            <p className="text-sm md:text-base lg:text-lg font-semibold mb-2"> by:{' '} {book.authors.join(', ')} </p>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col text-sm md:text-base lg:text-lg font-semibold px-6">
                            <p className="py-4 mb-2">{book.short_description}</p>
                            <p className="py-2 mb-2">{book.long_description}</p>
                        </div>
                    </div>
                </div>
            </div>
            {review && (
                <ReviewMobile review={review} />
            )
            }
        </div>
    );
}

export default DesktopBook;
