import React from "react";
import DisplayRating from "../../utils/DisplayRating";
import LoadBookImage from "../../utils/LoadBookImage";
import TruncateText from "../../utils/TruncateText";

function HomeFetchDesktop({ item, photoUrl }) {

    return (
        <div className="flex flex-row">
            <div className="flex w-full">
                <div className="flex flex-col w-56">
                    <LoadBookImage item={item} photoUrl={photoUrl}/>
                    <div className="flex flex-row mt-1 justify-center font-semibold">
                        <p className="pr-1">Rating: </p>
                        <DisplayRating value={item.rating}/>
                    </div>
                </div>
                <div className="flex flex-col float-right w-full ml-2">
                    <div className="text-xl lg:text-2xl font-semibold">
                        <h2>{TruncateText(item.title, 30)}</h2>
                    </div>
                    <div className="text-base lg:text-md text-gray-600 font-semibold">
                        <p>{TruncateText(item.authors.join(', '), 20)}</p>
                    </div>
                    <div>
                        <div className="hidden xl:block mt-2">
                            <p>{TruncateText(item.short_description, 60)}</p>
                        </div>
                        <div className="block xl:hidden mt-2">
                            <p>{TruncateText(item.short_description, 40)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
        ;
}

export default HomeFetchDesktop;
