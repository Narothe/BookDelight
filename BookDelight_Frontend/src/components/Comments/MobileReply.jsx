import React from "react";
import LoadBookUserImage from "../../utils/LoadBookUserImage";
import arrow from "../../assets/arrow-right.svg";
import {Link} from "react-router-dom";

function MobileReply({reply}) {
    const photoUrl = `${process.env.REACT_APP_USER_PHOTO_URL}`;

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
            <div className="flex flex-row pt-2 border-t justify-between">
                <div className="flex flex-row">
                    <div className="flex flex-row border-r pr-3 items-center">
                        <button
                            className="grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark">
                            <img src={arrow} alt="advanced" className="w-5 rotate-180"/>
                        </button>
                        <div className="flex pl-1">
                            <p className="text-sm md:text-base lg:text-lg font-semibold text-center">{reply.upvotes}</p>
                        </div>
                    </div>
                    <div className="flex pl-2.5 flex-row items-center">
                        <button
                            className="grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark">
                            <img src={arrow} alt="advanced" className="w-5"/>
                        </button>
                        <div className="flex pl-1">
                            <p className="text-sm md:text-base lg:text-lg font-semibold text-center">{reply.downvotes}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MobileReply;
