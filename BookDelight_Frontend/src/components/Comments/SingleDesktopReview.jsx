import React from 'react';
import LoadBookUserImage from "../../utils/LoadBookUserImage";
import arrow from "../../assets/arrow-right.svg";

function SingleDesktopReview({reviewData}) {
    const photoUrl = `${process.env.REACT_APP_USER_PHOTO_URL}`;

    console.log("Review data:", reviewData);

    return (
        <div className="flex flex-row">
            <div className="flex flex-col w-11/12">
                {/*photo & username*/}
                <div className="flex flex-row">
                    <div className="w-14 h-14">
                        <LoadBookUserImage item={reviewData} photoUrl={photoUrl}/>
                    </div>
                    <div className="flex items-center pl-2.5">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-clip overflow-hidden ...">{reviewData.username}</h2>
                    </div>
                </div>
                <div className="flex font-semibold">
                    <p className="text-sm md:text-base lg:text-lg py-2 mb-2">{reviewData.description}</p>
                </div>
            </div>
            {/*right panel*/}
            <div className="flex flex-col border-l w-1/12 pl-2">
                <p className="text-sm md:text-base lg:text-lg font-semibold mb-2 text-center text-clip overflow-hidden ...">{reviewData.username} rate:</p>
                <p className="text-sm md:text-base lg:text-lg font-semibold mb-4 text-center">{reviewData.rating}/10</p>
                <div className="flex flex-col">
                    <div className="flex flex-row mb-2.5">
                        <button
                            className="grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark">
                            <img src={arrow} alt="advanced" className="w-5 rotate-180"/>
                        </button>
                        <div className="flex pl-2">
                            <p className="text-sm md:text-base lg:text-lg font-semibold mb-2 text-center">{reviewData.upvotes}</p>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <button
                            className="grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark">
                            <img src={arrow} alt="advanced" className="w-5"/>
                        </button>
                        <div className="flex pl-2">
                            <p className="text-sm md:text-base lg:text-lg font-semibold mb-2 text-center">{reviewData.downvotes}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SingleDesktopReview;
