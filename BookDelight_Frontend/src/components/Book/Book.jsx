import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DesktopBook from "./DesktopBook";
import MobileBook from "./MobileBook";

function Book() {
    const {id} = useParams();
    const query = `${process.env.REACT_APP_BACKEND_URL}/book/${id}`;
    const photoUrl = `${process.env.REACT_APP_PHOTO_URL}`;

    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {

            try {
                const response = await axios.get(query);
                setBook(response.data);
            } catch (err) {
                console.error('Error fetching book details:', err);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (!book) return <p>No book data found</p>;

    return (

        <div>
            <div className="hidden md:block">
                <DesktopBook book={book} photoUrl={photoUrl}/>
            </div>
            <div className="block md:hidden">
                <MobileBook book={book} photoUrl={photoUrl}/>
            </div>
        </div>

        // <div className="container py-8 border p-4 mb-4 shadow-md rounded-lg bg-orange-100">
        //     <div className="flex border p-4 mb-4 rounded-lg shadow-md bg-orange-50">
        //         <div className="flex flex-col w-56">
        //             <div className="pb-4">
        //                 <LoadBookImage item={book} photoUrl={photoUrl}/>
        //             </div>
        //             <BookInfo book={book}/>
        //         </div>
        //         <div className="flex flex-col w-full">
        //             <div className="flex flex-row w-full px-4 justify-between">
        //                 <div className="flex flex-col">
        //                     <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">{book.title}</h2>
        //                     <p className="text-sm md:text-base lg:text-lg font-semibold mb-2"> by:{' '} {book.authors.join(', ')} </p>
        //                 </div>
        //                 <div className="flex flex-col text-sm md:text-base lg:text-lg font-semibold">
        //                     <div className="flex flex-row">
        //                         <p className="mb-2">Rating:</p>
        //                         <div className="ml-1 mb-2">
        //                             <DisplayRating className="mb-2" value={book.rating}/>
        //                         </div>
        //                     </div>
        //                     <p className="mb-2">Review count: {book.review_count}</p>
        //                 </div>
        //             </div>
        //             <div className="flex flex-row px-4">
        //                 <div className="flex flex-col text-sm md:text-base lg:text-lg font-semibold">
        //                     <p className="py-4 mb-2">{book.short_description}</p>
        //                     <p className="py-2 mb-2">{book.long_description}</p>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}

export default Book;
