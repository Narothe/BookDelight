import React from "react";

import DisplayRating from "../../utils/DisplayRating";
import LoadBookImage from "../../utils/LoadBookImage";

function HomeFetchMobile({ item, photoUrl }) {

    return (
        <div className="flex flex-row">
            <div className="flex w-full">
                <div className="flex w-36">
                    <LoadBookImage item={item} photoUrl={photoUrl}/>
                </div>
                <div className="flex flex-col w-full px-4">
                    <h2 className="text-xl sm:text-2xl font-semibold">{item.title}</h2>
                    <p className="text-sm sm:text-base font-semibold mb-2"> by:{' '} {item.authors.join(', ')} </p>
                    <p className="text-sm sm:text-base font-semibold mb-2">{item.short_description}</p>
                </div>
            </div>
        </div>

    )
        ;
}

export default HomeFetchMobile;
