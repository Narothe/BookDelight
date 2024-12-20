import React from "react";
import LoadBookUserImage from "../../utils/LoadBookUserImage";
import arrow from "../../assets/arrow-right.svg";
import LinkButton from "../../utils/LinkButton";
import {Link, useParams} from "react-router-dom";
import RepliesFetch from "./RepliesFetch";

function ReviewMobile({review}) {
    const photoUrl = `${process.env.REACT_APP_USER_PHOTO_URL}`;
    const {id} = useParams();
    const repliesData = RepliesFetch(id, review);

    return (
        <div>
        {/*<div className="flex flex-col border mt-4 p-4 rounded-md shadow-md bg-white">*/}
            {/*<h1 className="text-2xl lg:text-3xl font-bold mb-4 font-mono">Reviews</h1>*/}
            {review.map((item, index) => {
                const replyInfo = repliesData.find((data) => data.id_review === item.id_review);
                // let text = "";
                //
                // if (replyInfo.replyCount === 1) {
                //     text={`Show ${replyInfo.replyCount} replies`}
                // } else {
                //     text={`Show ${replyInfo.replyCount} replies`}
                // }

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
                                    {replyInfo?.hasReplies && (
                                        <div className="flex flex-row justify-center mt-2">
                                            <LinkButton text={`${replyInfo.replyCount} replies`}
                                                        link={`/book/${id}/review/${item.id_review}/all-reply`}/>
                                        </div>)
                                    }
                                </div>
                                <div className="flex flex-row">
                                    <div className="flex flex-row border-r pr-3 items-center">
                                        <button
                                            className="grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark">
                                            <img src={arrow} alt="advanced" className="w-5 rotate-180"/>
                                        </button>
                                        <div className="flex pl-1">
                                            <p className="text-sm md:text-base lg:text-lg font-semibold text-center">{item.upvotes}</p>
                                        </div>
                                    </div>
                                    <div className="flex pl-2.5 flex-row items-center">
                                        <button
                                            className="grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark">
                                            <img src={arrow} alt="advanced" className="w-5"/>
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
            {/*<div className="flex flex-col items-center justify-center mt-4">*/}
            {/*    <p className="mb-2 text-md md:text-base lg:text-lg">Do you have some thoughts? Add review!</p>*/}
            {/*    <div>*/}
            {/*        <LinkButton text="Add review" link={`/add-review`}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}

export default ReviewMobile;
