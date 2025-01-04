import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import SingleDesktopReview from "./SingleDesktopReview";
import SingleMobileReview from "./SingleMobileReview";
import ReplyDesktop from "./ReplyDesktop";
import ReplyMobile from "./ReplyMobile";
import DisplayRating from "../../utils/DisplayRating";
import LinkButton from "../../utils/LinkButton";
import LoadBookImage from "../../utils/LoadBookImage";
import {CircularProgress} from "@mui/material";
import AddReply from "../Forms/AddReply";

function ReviewCommentSection() {
    const {bookId, reviewId} = useParams();
    const [replyData, setReplyData] = useState([]);
    const [reviewData, setReviewData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const photoUrl = `${process.env.REACT_APP_USER_PHOTO_URL}`;
    const bookPhotoUrl = `${process.env.REACT_APP_BOOK_PHOTO_URL}`;

    useEffect(() => {
        const fetchReviewData = async () => {
            const url = `${process.env.REACT_APP_BACKEND_URL}/book/${bookId}/review/${reviewId}`;
            // console.log("Fetching data from:", url);
            try {
                const response = await axios.get(url);
                // console.log("Response data:", response.data);
                setReviewData(response.data);
            } catch (err) {
                console.error("Error fetching review data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        const fetchReplyData = async () => {
            const url = `${process.env.REACT_APP_BACKEND_URL}/book/${bookId}/review/${reviewId}/all-reply`;
            try {
                const response = await axios.get(url);
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
            fetchReplyData();
        }
    }, [bookId, reviewId]);

    if (loading) return (
        <div className="flex justify-center">
            <CircularProgress size={50}/>
        </div>
    );
    if (error) return <p>Error loading review: {error.message}</p>;

    // console.log("Review data.photo_path:", reviewData.photo_path);
    console.log("Review data:", reviewData);

    return (
        <div className="">
            <div className="hidden md:block">
                {replyData.length > 0 ? (
                    <div className="border pt-4 p-2 mb-4 rounded-md shadow-md bg-custom-new-white">
                        <div className="flex flex-col border p-4 mb-4 rounded-md shadow-md bg-white">
                            {/*<h1 className="text-2xl lg:text-3xl font-bold mb-6 font-mono">Review comment section</h1>*/}
                            {/*<div className="flex flex-row w-full pt-2 pb-2 border-t-2 border-b-2 justify-between">*/}
                            <div className="flex flex-row w-full pb-2 border-b-2">
                                <div className="flex w-16">
                                    <LoadBookImage item={reviewData} photoUrl={bookPhotoUrl}/>
                                </div>
                                <div className="flex flex-col pl-2">
                                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">{reviewData.title}</h2>
                                    <p className="text-sm md:text-base lg:text-lg font-semibold mb-2"> by:{' '} {reviewData.authors.join(', ')} </p>
                                    <div className="flex flex-row">
                                        <div className="flex flex-row">
                                            <p className="pr-1">Rating: </p>
                                            <DisplayRating value={reviewData.rating}/>
                                        </div>
                                        <p className="pl-2">Review count: {reviewData.review_count}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6">
                                <SingleDesktopReview reviewData={reviewData} photoUrl={photoUrl}/>
                            </div>
                        </div>
                        {/*{replyData.map((reply, index) => (*/}
                        {/*    <div key={index} className="border p-4 mb-4 rounded-md shadow-md bg-white">*/}
                        {/*        <ReplyDesktop reply={reply}/>*/}
                        {/*    </div>*/}
                        {/*))}*/}
                        <ReplyDesktop replyData={replyData}/>
                        <div className="flex flex-row justify-center mt-2">
                            <div className="flex flex-row justify-center mr-2">
                                <AddReply bookId={bookId} reviewId={reviewId} reviewUser={reviewData.username} post={reviewData}/>
                            </div>
                            <LinkButton text={`Return`} link={`/book/${reviewData.id_book}`}/>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <CircularProgress size={50}/>
                    </div>
                )}
            </div>


            <div className="block md:hidden">
                {replyData.length > 0 ? (
                    <div className="border pt-4 p-2 mb-4 rounded-md shadow-md bg-custom-new-white">
                        <div className="flex flex-col border p-4 mb-4 rounded-md shadow-md bg-white">
                            {/*<h1 className="text-2xl lg:text-3xl font-bold mb-6 font-mono">Review comment section</h1>*/}
                            <div className="flex flex-row w-full pb-2 border-b-2">
                                <div className="flex w-16">
                                    <LoadBookImage item={reviewData} photoUrl={bookPhotoUrl}/>
                                </div>
                                <div className="flex flex-col pl-2">
                                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">{reviewData.title}</h2>
                                    <p className="text-sm md:text-base lg:text-lg font-semibold mb-2"> by:{' '} {reviewData.authors.join(', ')} </p>
                                    <div className="flex flex-col">
                                        <div className="flex flex-row">
                                            <p className="pr-1">Rating: </p>
                                            <DisplayRating value={reviewData.rating}/>
                                        </div>
                                        <p className="">Review count: {reviewData.review_count}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6">
                                <SingleMobileReview reviewData={reviewData} photoUrl={photoUrl}/>
                            </div>
                        </div>

                        {/*{replyData.map((reply, index) => (*/}
                        {/*    <div key={index} className="border p-4 mb-4 rounded-md shadow-md bg-white">*/}
                        {/*        <ReplyMobile reply={reply}/>*/}
                        {/*    </div>*/}
                        {/*))}*/}
                        <ReplyMobile replyData={replyData}/>
                        <div className="flex flex-row justify-center mt-2">
                            <div className="flex flex-row justify-center mr-2">
                                <AddReply bookId={bookId} reviewId={reviewId} reviewUser={reviewData.username}
                                          post={reviewData}/>
                            </div>
                            <LinkButton text={`Return`} link={`/book/${reviewData.id_book}`}/>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <CircularProgress size={50}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ReviewCommentSection;
