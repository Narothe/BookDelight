import React from 'react';
import LoadBookImage from "../../utils/LoadBookImage";
import BookInfo from "./BookInfo";
import BookRatingInfo from "./BookRatingInfo";
import ReviewDesktop from "../Comments/ReviewDesktop";

function DesktopBook({ book, review, photoUrl }) {


    return (
        <div className="flex flex-col">
            <div className="flex border p-4 rounded-md shadow-md bg-white">
                <div className="flex flex-col w-56">
                    <div className="pb-4">
                        <LoadBookImage item={book} photoUrl={photoUrl}/>
                    </div>
                    <BookInfo book={book}/>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex flex-row w-full px-6 justify-between">
                        <div className="flex flex-col">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">{book.title}</h2>
                            <p className="text-sm md:text-base lg:text-lg font-semibold"> by:{' '} {book.authors.join(', ')} </p>
                            <p className="text-sm md:text-base lg:text-lg font-semibold mb-2"> Genres:{' '} {book.genres.join(', ')} </p>
                        </div>
                        <BookRatingInfo book={book}/>
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
                <ReviewDesktop review={review}/>
            )
            }
        </div>
    )
        ;
}

export default DesktopBook;
