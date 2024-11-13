import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DesktopBook from "./DesktopBook";
import MobileBook from "./MobileBook";
import LinkButton from "../../utils/LinkButton";

function Book() {
    const {id} = useParams();
    const bookQuery = `${process.env.REACT_APP_BACKEND_URL}/book/${id}`;
    const reviewQuery = `${process.env.REACT_APP_BACKEND_URL}/book/${id}/reviews`;
    const photoUrl = `${process.env.REACT_APP_PHOTO_URL}`;

    const [book, setBook] = useState(null);
    const [review, setReview] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(bookQuery);
                setBook(response.data);
            } catch (err) {
                console.error('Error fetching book details:', err);
            }
        };

        const fetchReviewsDetails = async () => {
            try {
                const response = await axios.get(reviewQuery);
                setReview(response.data);
                console.log(response.data);
            } catch (err) {
                console.error('Error fetching review details:', err);
            }
        };

        fetchBookDetails();
        fetchReviewsDetails();
    }, [id]);

    if (!book) return <p>No book data found</p>;

    return (

        <div className="pt-4 border p-2 mb-4 shadow-md rounded-md bg-custom-new-white">
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
