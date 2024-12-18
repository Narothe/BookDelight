import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DesktopBook from "./DesktopBook";
import MobileBook from "./MobileBook";
import {CircularProgress} from "@mui/material";

function Book() {
    const {id} = useParams();
    const bookQuery = `${process.env.REACT_APP_BACKEND_URL}/book/${id}`;
    const reviewQuery = `${process.env.REACT_APP_BACKEND_URL}/book/${id}/reviews`;
    const photoUrl = `${process.env.REACT_APP_BOOK_PHOTO_URL}`;

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
            } catch (err) {
                console.error('Error fetching review details:', err);
            }
        };

        fetchBookDetails();
        fetchReviewsDetails();
    }, [id]);

    if (!book) return (
        <div className="flex justify-center">
            <CircularProgress size={50}/>
        </div>
    );

    return (
        <div className="pt-4 border p-2 mb-4 shadow-md rounded-md bg-custom-new-white">
        <div className="hidden md:block">
                <DesktopBook book={book} review={review} photoUrl={photoUrl}/>
            </div>
            <div className="block md:hidden">
                <MobileBook book={book} review={review} photoUrl={photoUrl}/>
            </div>
        </div>
    );
}

export default Book;
