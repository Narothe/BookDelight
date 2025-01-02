import React, {useEffect, useState} from "react";
import LoadBookUserImage from "../../utils/LoadBookUserImage";
import arrow from "../../assets/arrow-right.svg";
import LinkButton from "../../utils/LinkButton";
import {Link, useParams} from "react-router-dom";
import RepliesFetch from "./RepliesFetch";
import AddReply from "../Forms/AddReply";
import {useAuth} from "../Auth/SessionHandling";
import axios from "axios";
import {toast} from "react-hot-toast";

function ReviewMobile({review}) {
    const {authData} = useAuth();

    const photoUrl = `${process.env.REACT_APP_USER_PHOTO_URL}`;
    const {id} = useParams();
    const repliesData = RepliesFetch(id, review);

    const [loading, setLoading] = useState(false);
    const [votes, setVotes] = useState({});

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

    return (
        <div>
            {review.map((item, index) => {
                const replyInfo = repliesData.find((data) => data.id_review === item.id_review);
                const userVote = votes[item.id_review];

                return (
                    <div className="flex flex-row border mb-4 p-4 rounded-md shadow-md bg-white" key={index}>
                        <div className="flex flex-col w-full justify-between">
                            <div className="flex flex-row justify-between">
                                {/*photo & username*/}
                                <div className="flex flex-row">
                                    <div className="w-12">
                                        <Link to={`/user/${item.review_author_id}`}>
                                            <LoadBookUserImage item={item} photoUrl={photoUrl}/>
                                        </Link>
                                    </div>
                                    <div className="flex items-center pl-2.5">
                                        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-clip overflow-hidden ...">{item.username}</h2>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-sm md:text-base lg:text-lg font-semibold mb-2 text-center">{item.username} rate: {item.rating}/10</p>
                                </div>
                            </div>
                            <div className="flex font-semibold">
                                <p className="text-sm md:text-base lg:text-lg py-1 mb-2">{item.description}</p>
                            </div>
                            {/*down panel*/}
                            <div className="flex flex-row pt-2 border-t justify-between">
                                <div className="">
                                    {/*<p className="text-sm md:text-base lg:text-lg font-semibold mb-2 text-center">{item.username} rate: {item.rating}/10</p>*/}
                                    {replyInfo?.hasReplies ? (
                                        <div className="flex flex-row justify-center ">
                                            <LinkButton text={`${replyInfo.replyCount} replies`}
                                                        link={`/book/${id}/review/${item.id_review}/all-reply`}/>
                                        </div>
                                        ) : (
                                    <div className="flex flex-row justify-center mr-2">
                                        <AddReply bookId={id} reviewId={item.id_review} reviewUser={item.username}
                                                  post={item}/>
                                    </div>
                            )}
                                </div>
                                <div className="flex flex-row">
                                    <div className="flex flex-row border-r pr-3 items-center">
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
                                        <div className="flex pl-1">
                                            <p className="text-sm md:text-base lg:text-lg font-semibold text-center">{item.upvotes}</p>
                                        </div>
                                    </div>
                                    <div className="flex pl-2.5 flex-row items-center">
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
                                        <div className="flex pl-1">
                                            <p className="text-sm md:text-base lg:text-lg font-semibold text-center">{item.downvotes}</p>
                                        </div>
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

export default ReviewMobile;
