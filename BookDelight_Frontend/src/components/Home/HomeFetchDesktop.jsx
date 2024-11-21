import React from "react";
import DisplayRating from "../../utils/DisplayRating";
import LoadBookImage from "../../utils/LoadBookImage";

function HomeFetchDesktop({ item, photoUrl }) {

    return (
        <div className="flex flex-row">
            <div className="flex basis-3/4 w-full">
                <div className="flex w-56">
                    <LoadBookImage item={item} photoUrl={photoUrl}/>
                </div>
                <div className="flex flex-col w-full px-4">
                    <h2 className="text-2xl lg:text-3xl font-semibold">{item.title}</h2>
                    <p className="text-base lg:text-lg font-semibold mb-2"> by:{' '} {item.authors.join(', ')} </p>
                    <p className="text-base lg:text-lg font-semibold mb-2 text-clip overflow-hidden ...">{item.short_description}</p>
                </div>
            </div>
            <div className="basis-1/4">
                <div className="flex flex-row">
                    <div className="flex-col basis-1/2 grid justify-items-center text-center">
                        <p className="text-sm lg:text-base font-semibold mb-2">rate</p>
                        <div className="text-sm lg:text-base font-semibold mb-2">
                            <DisplayRating value={item.rating}/>
                        </div>
                    </div>
                    <div className="flex-col basis-1/2 grid justify-items-center text-center">
                        <p className="text-sm lg:text-base font-semibold mb-2">reviews</p>
                        <p className="text-sm lg:text-base font-semibold mb-2">{item.review_count}</p>
                    </div>
                </div>
            </div>

        </div>

    )
        ;
}

export default HomeFetchDesktop;
