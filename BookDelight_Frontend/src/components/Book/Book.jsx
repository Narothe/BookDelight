import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Book() {
    const { id } = useParams();

    const [book, setBook] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            const query = `${process.env.REACT_APP_BACKEND_URL}/book/${id}`;
            console.log(query);

            try {
                const response = await axios.get(query);
                setBook(response.data);
            } catch (err) {
                console.error('Error fetching book details:', err);
                // setError('Failed to fetch book details');
            }
            // finally {
            //     setLoading(false);
            // }
        };

        fetchBookDetails();
    }, [id]);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>{error}</p>;
    if (!book) return <p>No book data found</p>;

    return (
        <div>
            <h1>{book.title}</h1>
            <p> by:{' '} {book.authors.join(', ')} </p>
            <p>Description: {book.short_description}</p>

        </div>
    );
}

export default Book;
