import React, { useEffect, useState } from "react";
import LoadBookUserImage from "../../utils/LoadBookUserImage";
import arrow from "../../assets/arrow-right.svg";
import trash from "../../assets/trash-can.svg";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../Auth/SessionHandling";
import axios from "axios";
import { toast } from "react-hot-toast";

function ReplyDesktop({ replyData }) {
    const { authData } = useAuth();
    const { bookId, reviewId } = useParams();

    const photoUrl = `${process.env.REACT_APP_USER_PHOTO_URL}`;
    const [votes, setVotes] = useState({}); // Przechowuje stany głosów dla każdego reply
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const votesData = await Promise.all(
                    replyData.map(async (reply) => {
                        const response = await axios.get(
                            `${process.env.REACT_APP_BACKEND_URL}/reply/${reply.id_reply}/vote-type`,
                            {
                                headers: { Authorization: `Bearer ${authData?.token}` },
                            }
                        );
                        return { id: reply.id_reply, voteType: response.data.vote_type };
                    })
                );

                const votesMap = votesData.reduce((acc, { id, voteType }) => {
                    acc[id] = voteType;
                    return acc;
                }, {});

                setVotes(votesMap);
            } catch (err) {
                console.error("Error fetching vote types:", err);
            }
        };

        if (authData) {
            fetchVotes();
        }
    }, [authData, replyData]);

    const handleVote = async (replyId, voteType) => {
        if (loading) return;

        const reply = replyData.find((r) => r.id_reply === replyId);
        if (authData?.user?.userId === reply.review_author_id) {
            toast.error("You cannot vote on your own reply.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/book/${bookId}/review/${reviewId}/reply/${replyId}/vote`,
                { vote_type: voteType },
                {
                    headers: { Authorization: `Bearer ${authData?.token}` },
                }
            );

            if (response.status === 200) {
                setVotes((prevVotes) => ({
                    ...prevVotes,
                    [replyId]: voteType,
                }));
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

    const handleDeleteForAdmins = async (replyId) => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_BACKEND_URL}/book/${bookId}/review/${reviewId}/reply`,
                {
                    headers: { Authorization: `Bearer ${authData?.token}` },
                    data: { replyId: replyId },
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
        <div className="flex flex-col">
            {replyData.map((reply) => (
                <div key={reply.id_reply} className="border p-4 mb-4 rounded-md shadow-md bg-white">
                    <div className="flex flex-row">
                        <div className="flex flex-col justify-between w-11/12">
                            {/* Photo & Username */}
                            <div className="flex flex-row justify-between">
                                <Link to={`/user/${reply.review_author_id}`}>
                                    <div className="flex flex-row">
                                        <div className="w-12">
                                            <LoadBookUserImage item={reply} photoUrl={photoUrl}/>
                                        </div>
                                        <div className="flex items-center pl-2.5">
                                            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-clip overflow-hidden">
                                                {reply.username}
                                            </h2>
                                        </div>
                                    </div>
                                </Link>
                                {  (authData?.user?.isAdmin) &&
                                <div className="flex items-center mr-2">
                                    <button
                                        onClick={() => handleDeleteForAdmins(reply.id_reply)}
                                        className={`grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 ${
                                            votes[reply.id_reply] === "upvote"
                                                ? "border-green-500 bg-green-200"
                                                : "border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark"
                                        }`}
                                        disabled={loading}
                                    >
                                        <img src={trash} alt="delete" className="w-4"/>
                                    </button>
                                </div>
                                }
                            </div>
                            <div className="flex font-semibold">
                                <p className="text-sm md:text-base lg:text-lg py-4 mb-2">{reply.description}</p>
                            </div>
                        </div>
                        {/* Right Panel */}
                        <div className="flex flex-col border-l w-1/12 pl-2 justify-center">
                            <div className="flex flex-col">
                                <div className="flex flex-row mb-2.5">
                                    <button
                                        onClick={() => handleVote(reply.id_reply, "upvote")}
                                        className="grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4"
                                        disabled={loading}
                                        >
                                            <img src={arrow} alt="Upvote" className="w-5 rotate-180"/>
                                        </button>
                                        <div className="flex pl-2">
                                            <p className="text-sm md:text-base lg:text-lg font-semibold mb-2 text-center">
                                                {reply.upvotes}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <button
                                            onClick={() => handleVote(reply.id_reply, "downvote")}
                                            className={`grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 ${
                                                votes[reply.id_reply] === "downvote"
                                                    ? "border-red-500 bg-red-200"
                                                    : "border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark"
                                            }`}
                                            disabled={loading}
                                        >
                                            <img src={arrow} alt="Downvote" className="w-5 rotate-0"/>
                                        </button>
                                        <div className="flex pl-2">
                                            <p className="text-sm md:text-base lg:text-lg font-semibold mb-2 text-center">
                                                {reply.downvotes}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
        </div>
    );
}

export default ReplyDesktop;
