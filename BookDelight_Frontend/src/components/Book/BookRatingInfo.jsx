import React from 'react';
import DisplayRating from "../../utils/DisplayRating";
import {useAuth} from "../Auth/SessionHandling";
import LinkButton from "../../utils/LinkButton";

function BookRatingInfo({ book }) {
    const {authData} = useAuth();

    return (
        <div className="flex flex-col text-sm md:text-base lg:text-lg font-semibold">
            <div className="flex flex-row">
                <p className="mb-2">Rating:</p>
                <div className="ml-1 mb-2">
                    <DisplayRating className="mb-2" value={book.rating}/>
                </div>
            </div>
            <p className="mb-2">Review count: {book.review_count}</p>
            {authData && book.id_user === authData.user.userId &&
                <div>
                    <LinkButton text="Add cover" link={`/book/${book.id_book}/add-photo`}/>
                </div>
            }
        </div>
    );
}

export default BookRatingInfo;
