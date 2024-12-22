import React from 'react';
import LoadBookImage from "../../utils/LoadBookImage";
import BookInfo from "./BookInfo";
import BookRatingInfo from "./BookRatingInfo";
import ReviewMobile from "../Comments/ReviewMobile";
import LinkButton from "../../utils/LinkButton";
import LoadBookUserImage from "../../utils/LoadBookUserImage";
import {Link} from "react-router-dom";
import AddReview from "../Forms/AddReview";

function DesktopBook({ book, review, photoUrl }) {

    const userPhotoUrl = `${process.env.REACT_APP_USER_PHOTO_URL}`;

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
                            <p className="text-sm md:text-base lg:text-lg font-semibold"> by:{' '} {book.authors.join(', ')} </p>
                            <p className="text-sm md:text-base lg:text-lg font-semibold mb-2"> Genres:{' '} {book.genres.join(', ')} </p>
                        </div>
                    </div>
                    <div className="flex flex-col h-full justify-between">
                        <div className="flex flex-col text-sm md:text-base lg:text-lg font-semibold px-6">
                            <p className="py-4 mb-2">{book.short_description}</p>
                            <p className="py-2 mb-2">{book.long_description}</p>
                        </div>
                        <div className="ml-4 p-2">
                            <Link to={`/user/${book.id_user}`}>
                                <div className="flex flex-row items-center">
                                    <p className="text-xs md:text-sm lg:text-base mr-1"> Book added by: {' '}
                                        <strong> {book.book_added_by_username} </strong></p>
                                    <div className="w-6">
                                        <LoadBookUserImage item={book} photoUrl={userPhotoUrl}/>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col border mt-4 p-4 rounded-md shadow-md bg-white">
                <h1 className="text-2xl lg:text-3xl font-bold mb-4 font-mono">Reviews</h1>
                {review && (
                    <ReviewMobile review={review}/>
                )
                }
                <div className="flex flex-col items-center justify-center mt-4">
                    <p className="mb-2 text-md md:text-base lg:text-lg">Do you have some thoughts? Add review!</p>
                    {/*<div>*/}
                    {/*    <LinkButton text="Add review" link={`/book/${book.id_book}/add-review`}/>*/}
                    {/*</div>*/}
                    <div className="flex flex-row justify-center mt-2">
                        <AddReview bookId={book.id_book} bookTitle={book.title}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DesktopBook;
