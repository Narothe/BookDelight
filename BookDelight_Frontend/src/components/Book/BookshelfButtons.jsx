import React from "react";
import {useAuth} from "../Auth/SessionHandling";
import BookshelfButtonFavorite from "./BookshelfButtonFavorite";
import BookshelfButtonCurrentlyReading from "./BookshelfButtonCurrentlyReading";
import BookshelfButtonReadBooks from "./BookshelfButtonReadBooks";
import BookshelfButtonWishToRead from "./BookshelfButtonWishToRead";

function BookshelfButtons({book}) {

    const {authData} = useAuth();

    return (
        <div className="flex justify-center justify-items-center content-center h-auto pr-1">
            <BookshelfButtonCurrentlyReading book={book} authData={authData}/>
            <BookshelfButtonFavorite book={book} authData={authData}/>
            <BookshelfButtonReadBooks book={book} authData={authData}/>
            <BookshelfButtonWishToRead book={book} authData={authData}/>
        </div>
    );

}

export default BookshelfButtons;
