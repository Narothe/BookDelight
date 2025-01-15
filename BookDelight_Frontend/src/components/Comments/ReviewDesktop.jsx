import React, {useEffect, useState} from "react";
import LoadBookUserImage from "../../utils/LoadBookUserImage";
import arrow from "../../assets/arrow-right.svg";
import LinkButton from "../../utils/LinkButton";
import RepliesFetch from "./RepliesFetch";
import {Link, useParams} from "react-router-dom";
import AddReply from "../Forms/AddReply";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useAuth} from "../Auth/SessionHandling";
import trash from "../../assets/trash-can.svg";

function ReviewDesktop({review}) {
    const {authData} = useAuth();

    const photoUrl = `${process.env.REACT_APP_USER_PHOTO_URL}`;
    const {id} = useParams();
    const repliesData = RepliesFetch(id, review);

    const [loading, setLoading] = useState(false);
    const [votes, setVotes] = useState({});

    // console.log(review);
    // console.log(review.review_author_id);

    useEffect(() => {
        const fetchVotes = async () => {
            const initialVotes = {};

            for (const item of review) {
                try {
                    const response = await axios.get(
                        `${process.env.REACT_APP_BACKEND_URL}/review/${item.id_review}/vote-type`,
                        {
                            headers: {
                                Authorization: `Bearer ${authData.token}`,
                            },
                        }
                    );

                    initialVotes[item.id_review] = response.data.vote_type;
                } catch (err) {
                    console.error("Failed to fetch vote type:", err);
                    initialVotes[item.id_review] = null;
                }
            }

            setVotes(initialVotes);
        };

        fetchVotes();
    }, [review, authData]);

    const handleReviewVote = async (idReview, voteType) => {
        setLoading(true);

        for (const item of review) {

            if (authData?.user?.userId === item.review_author_id) {
                toast.error("You cannot vote on your own reply.");
                return;
            }

            try {
                await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/book/${id}/review/${idReview}/vote`,
                    {vote_type: voteType},
                    {
                        headers: {
                            Authorization: `Bearer ${authData.token}`,
                        },
                    }
                );

                toast.success("Vote successful!", {
                    position: "top-center",
                });

                setTimeout(() => window.location.reload(), 1000);

            } catch (err) {
                console.error("Verify failed:", err);
                toast.error("Verify failed. Please try again later.", {
                    position: "top-center",
                });
            } finally {
                setLoading(false);
            }
        }
    }

    const handleDeleteForAdmins = async (bookId, reviewId) => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_BACKEND_URL}/book/${bookId}/review`,
                {
                    headers: { Authorization: `Bearer ${authData?.token}` },
                    data: { reviewId: reviewId },
                }
            );


            if (response.status === 200) {
                toast.success("Reply deleted successfully.");
                setTimeout(() => window.location.reload(), 1000);
            }
        } catch (err) {
            console.error("Error deleting reply:", err);
            toast.error("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {review.map((item, index) => {
                console.log(item.id_review)
                console.log(item)
                const replyInfo = repliesData.find((data) => data.id_review === item.id_review);
                const userVote = votes[item.id_review];

                return (
                    <div className="flex flex-row border p-4 mb-4 rounded-md shadow-md bg-white" key={index}>
                        <div className="flex flex-col w-11/12">
                            <div className="flex flex-col justify-between">
                                {/*photo & username*/}
                                <div className="flex flex-row justify-between">
                                    <Link to={`/user/${item.review_author_id}`}>
                                        <div className="flex flex-row">
                                            <div className="w-14">
                                                <LoadBookUserImage item={item} photoUrl={photoUrl}/>
                                            </div>
                                            <div className="flex items-center pl-2.5">
                                                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-clip overflow-hidden ...">{item.username}</h2>
                                            </div>
                                        </div>
                                    </Link>
                                    {  (authData?.user?.isAdmin) &&
                                        <div className="flex items-center mr-2">
                                            <button
                                                onClick={() => handleDeleteForAdmins(item.id_book, item.id_review)}
                                                className="grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark"
                                                disabled={loading}
                                            >
                                                <img src={trash} alt="delete" className="w-4"/>
                                            </button>
                                        </div>
                                    }
                                </div>
                                <div className="flex font-semibold">
                                    <p className="text-sm md:text-base lg:text-lg pt-4 pr-2">{item.description}</p>
                                </div>
                            </div>
                            {/*replies buttons*/}
                            <div className="flex mt-2 justify-between">
                                {replyInfo?.hasReplies && (
                                    <div className="flex flex-row justify-center">
                                        <LinkButton text={`${replyInfo.replyCount} replies`}
                                                    link={`/book/${id}/review/${item.id_review}/all-reply`}/>
                                    </div>)
                                }
                                <div className="flex flex-row justify-center mr-2">
                                    <AddReply bookId={id} reviewId={item.id_review} reviewUser={item.username}
                                              post={item}/>
                                </div>
                            </div>
                        </div>
                        {/*right panel*/}
                        <div className="flex flex-col border-l w-1/12 pl-2">
                            <p className="text-sm md:text-base lg:text-lg font-semibold mb-2 text-center text-clip overflow-hidden ...">{item.username} rate:</p>
                            <p className="text-sm md:text-base lg:text-lg font-semibold mb-4 text-center">{item.rating}/10</p>
                            <div className="flex flex-col">
                                <div className="flex flex-row mb-2.5">
                                    <button
                                        onClick={() => handleReviewVote(item.id_review, "upvote")}
                                        className={`grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 ${
                                            userVote === "upvote"
                                                ? "border-green-500 bg-green-200"
                                                : "border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark"
                                        }`}
                                        disabled={loading}
                                    >
                                        <img src={arrow} alt="Upvote" className="w-5 rotate-180"/>
                                    </button>
                                    <div className="flex pl-2">
                                        <p className="text-sm md:text-base lg:text-lg font-semibold mb-2 text-center">{item.upvotes}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <button
                                        onClick={() => handleReviewVote(item.id_review, "downvote")}
                                        className={`grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 ${
                                            userVote === "downvote"
                                                ? "border-red-500 bg-red-200"
                                                : "border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark"
                                        }`}
                                        disabled={loading}
                                    >
                                        <img src={arrow} alt="Downvote" className="w-5"/>
                                    </button>
                                    <div className="flex pl-2">
                                        <p className="text-sm md:text-base lg:text-lg font-semibold mb-2 text-center">{item.downvotes}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default ReviewDesktop;
