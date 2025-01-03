import React, {useEffect, useState} from "react";
import LoadBookUserImage from "../../utils/LoadBookUserImage";
import arrow from "../../assets/arrow-right.svg";
import {Link, useParams} from "react-router-dom";
import {useAuth} from "../Auth/SessionHandling";
import axios from "axios";
import {toast} from "react-hot-toast";

function ReplyMobile({reply}) {
    const {authData} = useAuth();
    const {bookId} = useParams();
    const {reviewId} = useParams();

    const photoUrl = `${process.env.REACT_APP_USER_PHOTO_URL}`;

    const [userVote, setUserVote] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserVote = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/reply/${reply.id_reply}/vote-type`,
                    {
                        headers: {Authorization: `Bearer ${authData?.token}`},
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
    }, [authData, reply.id_reply]);

    const handleVote = async (voteType) => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/book/${bookId}/review/${reviewId}/reply/${reply.id_reply}/vote`,
                {vote_type: voteType},
                {
                    headers: {Authorization: `Bearer ${authData?.token}`},
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

    const isOwnReply = authData?.user?.userId != reply.review_author_id;

    return (
        <div className="flex flex-col w-full justify-between">
            <div className="flex flex-row justify-between">
                {/*photo & username*/}
                <div className="flex flex-row">
                    <div className="w-12">
                        <Link to={`/user/${reply.review_author_id}`}>
                            <LoadBookUserImage item={reply} photoUrl={photoUrl}/>
                        </Link>
                    </div>
                    <div className="flex items-center pl-2.5">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-clip overflow-hidden ...">{reply.username}</h2>
                    </div>
                </div>
            </div>
            <div className="flex font-semibold">
                <p className="text-sm md:text-base lg:text-lg py-1 mb-2">{reply.description}</p>
            </div>
            {/*down panel*/}
            {isOwnReply && (
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
                                <p className="text-sm md:text-base lg:text-lg font-semibold text-center">{reply.upvotes}</p>
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
                                <p className="text-sm md:text-base lg:text-lg font-semibold text-center">{reply.downvotes}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReplyMobile;
