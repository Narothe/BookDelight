import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DesktopBook from "./DesktopBook";
import MobileBook from "./MobileBook";
import LinkButton from "../../utils/LinkButton";

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

        <div className="container pt-8 border p-4 mb-4 shadow-md rounded-lg bg-orange-100">
            <div className="hidden md:block">
                <DesktopBook book={book} photoUrl={photoUrl}/>
            </div>
            <div className="block md:hidden">
                <MobileBook book={book} photoUrl={photoUrl}/>
            </div>
            <div className="flex justify-center mt-4">
                <LinkButton text="Reviews" link={`/book/${book.id_book}/reviews`}/>
            </div>
        </div>
    );
}

export default Book;
