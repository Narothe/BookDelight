import React from "react";
import notExistingUserPhoto from "../../assets/user.svg";

function DesktopReview({review}) {

    return (
        <div className="flex flex-col border mt-4 p-4 rounded-md shadow-md bg-white">
            <h1 className="text-2xl lg:text-3xl font-bold mb-4 font-mono">Top 5 reviews</h1>
            <div className="flex border p-4 rounded-md shadow-md bg-white">
                {review.map((item, index) => (
                    <div className="flex flex-col" key={index}>
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-row">
                                <div className="w-11">
                                    <img src={notExistingUserPhoto} alt="photo"/>
                                </div>
                                <div className="flex items-center pl-3">
                                    <h2 className="text-xl font-semibold">{item.username}</h2>
                                </div>
                            </div>
                            <div className="flex">
                                <p className="text-sm md:text-base lg:text-lg font-semibold mb-2">{item.username} rate: {item.rating}/10</p>
                            </div>
                        </div>
                        <div className="flex">
                            <p className="py-4 mb-2">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DesktopReview;
