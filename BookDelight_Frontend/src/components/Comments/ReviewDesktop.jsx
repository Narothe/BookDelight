import React from "react";
import LoadUserImage from "../../utils/LoadUserImage";
import arrow from "../../assets/arrow-right.svg";
import LinkButton from "../../utils/LinkButton";
import RepliesFetch from "./RepliesFetch";
import {useParams} from "react-router-dom";

function ReviewDesktop({review}) {
    const photoUrl = `${process.env.REACT_APP_USER_PHOTO_URL}`;
    const {id} = useParams();
    const repliesData = RepliesFetch(id, review);

    return (
        <div className="flex flex-col border mt-4 p-4 rounded-md shadow-md bg-white">
            <h1 className="text-2xl lg:text-3xl font-bold mb-4 font-mono">Reviews</h1>
            {review.map((item, index) => {
                const replyInfo = repliesData.find((data) => data.id_review === item.id_review);

                return (
                    <div className="flex flex-col border p-4 mb-4 rounded-md shadow-md bg-white" key={index}>
                        <div className="flex flex-row">
                            <div className="flex flex-col justify-between w-11/12">
                                {/*photo & username*/}
                                <div className="flex flex-row">
                                    <div className="w-14 h-14">
                                        <LoadUserImage item={item} photoUrl={photoUrl}/>
                                    </div>
                                    <div className="flex items-center pl-2.5">
                                        <h2 className="text-xl md:text-2xl lg:text-3xl  font-semibold">{item.username}</h2>
                                    </div>
                                </div>
                                <div className="flex font-semibold">
                                    <p className="text-sm md:text-base lg:text-lg py-4 mb-2">{item.description}</p>
                                </div>
                            </div>
                            {/*right panel*/}
                            <div className="flex flex-col border-l w-2/12 pl-2">
                                <p className="text-sm md:text-base lg:text-lg font-semibold mb-2 text-center">{item.username} rate: {item.rating}/10</p>
                                <div className="flex flex-col">
                                    <div className="flex flex-row mb-2.5">
                                        <button
                                            className="grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark">
                                            <img src={arrow} alt="advanced" className="w-5 rotate-180"/>
                                        </button>
                                        <div className="flex pl-2">
                                            <p className="text-sm md:text-base lg:text-lg font-semibold mb-2 text-center">{item.upvotes}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <button
                                            className="grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark">
                                            <img src={arrow} alt="advanced" className="w-5"/>
                                        </button>
                                        <div className="flex pl-2">
                                            <p className="text-sm md:text-base lg:text-lg font-semibold mb-2 text-center">{item.downvotes}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="flex flex-row">
                            {replyInfo?.hasReplies && (
                                <div className="flex flex-row justify-center mt-2">
                                    <LinkButton text={`Show ${replyInfo.replyCount} replies`}
                                                link={`/book/${id}/review/${item.id_review}/all-reply`}/>
                                </div>)
                            }
                        </div>
                        {/*{replyInfo && replyInfo.hasReplies ? (*/}
                        {/*    <p>Replies: {replyInfo.replyCount}</p>*/}
                        {/*) : (*/}
                        {/*    <p>No replies</p>*/}
                        {/*)}*/}
                    </div>
                )
            })}
            <div className="flex justify-center mt-4">
                <LinkButton text="Show more reviews" link={`/login`}/>
            </div>
        </div>
    );
}

export default ReviewDesktop;
