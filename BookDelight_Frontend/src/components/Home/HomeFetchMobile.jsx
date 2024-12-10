import React from "react";
import LoadBookImage from "../../utils/LoadBookImage";
import TruncateText from "../../utils/TruncateText";
import DisplayRating from "../../utils/DisplayRating";

function HomeFetchMobile({ item, photoUrl }) {

    return (
        <div className="flex flex-row">
            <div className="flex w-full">
                <div className="flex flex-col w-36">
                    <LoadBookImage item={item} photoUrl={photoUrl}/>
                    <div className="block sm:hidden">
                        <div className="flex flex-row text-sm sm:text-base justify-center mt-1 font-semibold">
                            <p className="pr-1">Rating: </p>
                            <DisplayRating value={item.rating}/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full px-4">
                    <h2 className="text-xl sm:text-2xl font-semibold">{item.title}</h2>
                    <p className="text-sm sm:text-base text-gray-600 font-semibold mb-1"> by:{' '} {item.authors.join(', ')} </p>
                    <div className="hidden sm:block">
                        <div className="flex flex-row mb-2 text-sm sm:text-base font-semibold">
                            <p className="pr-1">Rating: </p>
                            <DisplayRating value={item.rating}/>
                        </div>
                    </div>
                    <div className="text-sm sm:text-base">
                        <p>{TruncateText(item.short_description, 70)}</p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default HomeFetchMobile;
