import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

function OverallReview() {
    const { bookId, reviewId } = useParams();
    const [replyData, setReplyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviewData = async () => {
            const url = `${process.env.REACT_APP_BACKEND_URL}/book/${bookId}/review/${reviewId}/all-reply`;
            console.log("Fetching data from:", url);
            try {
                const response = await axios.get(url);
                console.log("Response data:", response.data);
                setReplyData(response.data);
            } catch (err) {
                console.error("Error fetching review data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (bookId && reviewId) {
            fetchReviewData();
        }
    }, [bookId, reviewId]);

    if (loading) return <p>Loading review details...</p>;
    if (error) return <p>Error loading review: {error.message}</p>;

    return (
        <div>
            <h1>Overall Reviews</h1>
            {replyData.length > 0 ? (
                <ul>
                    {replyData.map((review, index) => (
                        <li key={index}>
                            <p>{review.description || "No description available."}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews available.</p>
            )}
        </div>
    );
}

export default OverallReview;
