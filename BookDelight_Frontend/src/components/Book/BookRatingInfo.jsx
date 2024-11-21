import React from 'react';
import DisplayRating from "../../utils/DisplayRating";

function BookRatingInfo({ book }) {

    console.log("BookRatingInfo book:", book);

    return (
        <div className="flex flex-col text-sm md:text-base lg:text-lg font-semibold">
            <div className="flex flex-row">
                <p className="mb-2">Rating:</p>
                <div className="ml-1 mb-2">
                    <DisplayRating className="mb-2" value={book.rating}/>
                </div>
            </div>
            <p className="mb-2">Review count: {book.review_count}</p>
        </div>
    );
}

export default BookRatingInfo;
