import React from 'react';
import LoadBookUserImage from "../../utils/LoadBookUserImage";
import arrow from "../../assets/arrow-right.svg";
import LinkButton from "../../utils/LinkButton";
import {Link} from "react-router-dom";

function SingleMobileReview({reviewData}) {
    const photoUrl = `${process.env.REACT_APP_USER_PHOTO_URL}`;

    return (
        <div className="flex flex-col w-full justify-between">
            <div className="flex flex-row justify-between">
                {/*photo & username*/}
                <div className="flex flex-row">
                    <div className="w-14 h-14">
                        <Link to={`/user/${reviewData.review_author_id}`}>
                            <LoadBookUserImage item={reviewData} photoUrl={photoUrl}/>
                        </Link>
                    </div>
                    <div className="flex items-center pl-2.5">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-clip overflow-hidden ...">{reviewData.username}</h2>
                    </div>
                </div>
                <div className="flex items-center">
                    <p className="text-sm md:text-base lg:text-lg font-semibold mb-2 text-center">{reviewData.username} rate: {reviewData.rating}/10</p>
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
                            className="grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark">
                            <img src={arrow} alt="advanced" className="w-5 rotate-180"/>
                        </button>
                        <div className="flex pl-1">
                            <p className="text-sm md:text-base lg:text-lg font-semibold text-center">{reviewData.upvotes}</p>
                        </div>
                    </div>
                    <div className="flex pl-2.5 flex-row items-center">
                        <button
                            className="grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark">
                            <img src={arrow} alt="advanced" className="w-5"/>
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
