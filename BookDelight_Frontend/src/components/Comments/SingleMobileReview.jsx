import React, {useEffect, useState} from 'react';
import LoadBookUserImage from "../../utils/LoadBookUserImage";
import arrow from "../../assets/arrow-right.svg";
import {Link, useParams} from "react-router-dom";
import {useAuth} from "../Auth/SessionHandling";
import axios from "axios";
import {toast} from "react-hot-toast";

function SingleMobileReview({reviewData}) {
    const { authData } = useAuth();
    const {bookId} = useParams();
    const {reviewId} = useParams();

    const photoUrl = `${process.env.REACT_APP_USER_PHOTO_URL}`;

    const [userVote, setUserVote] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserVote = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/review/${reviewId}/vote-type`,
                    {
                        headers: { Authorization: `Bearer ${authData?.token}` },
                    }
                );
                setUserVote(response.data.vote_type);
            } catch (err) {
                console.error("Error fetching vote type:", err);
            }
        };

        if (authData) {
            fetchUserVote();
        }
    }, []);

    const handleVote = async (voteType) => {
        if (loading) return;

        if (authData?.user?.userId === reviewData.review_author_id) {
            toast.error("You cannot vote on your own reply.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/book/${bookId}/review/${reviewId}/vote`,
                { vote_type: voteType },
                {
                    headers: { Authorization: `Bearer ${authData?.token}` },
                }
            );

            if (response.status === 200) {
                setUserVote(voteType);
                toast.success("Vote submitted successfully.");

                setTimeout(() => window.location.reload(), 1000);
            }
        } catch (err) {
            console.error("Error submitting vote:", err);
            toast.error("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col w-full justify-between">
            <div className="flex flex-row justify-between">
                {/*photo & username*/}
                <Link to={`/user/${reviewData.review_author_id}`}>
                    <div className="flex flex-row">
                        <div className="w-14 h-14">
                                <LoadBookUserImage item={reviewData} photoUrl={photoUrl}/>
                        </div>
                        <div className="flex items-center pl-2.5">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-clip overflow-hidden ...">{reviewData.username}</h2>
                        </div>
                    </div>
                </Link>
                <div className="flex items-center">
                    <p className="text-sm md:text-base lg:text-lg font-semibold mb-2 text-center">{reviewData.username} rate: {reviewData.user_rating}/10</p>
                </div>
            </div>
            <div className="flex font-semibold pt-1">
                <p className="text-sm md:text-base lg:text-lg py-1 mb-2">{reviewData.description}</p>
            </div>
            {/*down panel*/}
            <div className="flex flex-row pt-2 border-t justify-between">
                <div className="flex flex-row">
                    <div className="flex flex-row border-r pr-3 items-center">
                        <button
                            onClick={() => handleVote("upvote")}
                            className={`grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 ${
                                userVote === "upvote"
                                    ? "border-green-500 bg-green-200"
                                    : "border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark"
                            }`}
                            disabled={loading}
                        >
                            <img src={arrow} alt="Upvote" className="w-5 rotate-180"/>
                        </button>
                        <div className="flex pl-1">
                            <p className="text-sm md:text-base lg:text-lg font-semibold text-center">{reviewData.upvotes}</p>
                        </div>
                    </div>
                    <div className="flex pl-2.5 flex-row items-center">
                        <button
                            onClick={() => handleVote("downvote")}
                            className={`grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 ${
                                userVote === "downvote"
                                    ? "border-red-500 bg-red-200"
                                    : "border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark"
                            }`}
                            disabled={loading}
                        >
                            <img src={arrow} alt="Downvote" className="w-5 rotate-0"/>
                        </button>
                        <div className="flex pl-1">
                            <p className="text-sm md:text-base lg:text-lg font-semibold text-center">{reviewData.downvotes}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleMobileReview;
