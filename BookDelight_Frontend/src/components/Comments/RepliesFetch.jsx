import { useEffect, useState } from "react";
import axios from "axios";

function RepliesFetch(id, reviews) {
    const [repliesData, setRepliesData] = useState([]);

    const backendUrl = `${process.env.REACT_APP_BACKEND_URL}`;

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

                            // Extracting reply count
                            const replyCount = response.status === 200 ? response.data.length : 0;

                            return {
                                id_review: review.id_review,
                                replyCount: replyCount,
                                hasReplies: replyCount > 0,
                            };
                        } catch (error) {
                            console.error(`Error fetching replies for review ${review.id_review}:`, error);

                            return {
                                id_review: review.id_review,
                                replyCount: 0,
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
