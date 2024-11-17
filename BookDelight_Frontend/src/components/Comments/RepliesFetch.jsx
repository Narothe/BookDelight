import { useEffect, useState } from "react";
import axios from "axios";

function RepliesFetch(id, reviews) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [repliesData, setRepliesData] = useState([]);

    const backendUrl =`${process.env.REACT_APP_BACKEND_URL}`;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const fetchRepliesForReview = async () => {
            try {
                const data = await Promise.all(
                    reviews.map(async (review) => {
                        try {
                            const response = await axios.get(
                                `${backendUrl}/book/${id}/review/${review.id_review}/all-reply`,
                                { validateStatus: (status) => status === 200 || status === 404 }
                            );
                            return {
                                id_review: review.id_review,
                                hasReplies: response.status === 200 && response.data.length > 0,
                            };
                        } catch (error) {
                            console.error(`Error fetching replies for review ${review.id_review}:`, error);
                            return {
                                id_review: review.id_review,
                                hasReplies: false,
                            };
                        }
                    })
                );
                setRepliesData(data);
            } catch (err) {
                console.error("Error fetching replies:", err);
            }
        };

        if (reviews?.length) {
            fetchRepliesForReview();
        }
    }, [id, reviews]);

    return repliesData;
}

export default RepliesFetch;
